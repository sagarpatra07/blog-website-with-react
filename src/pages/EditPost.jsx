import React, { useEffect, useState } from 'react';
import { Container, PostForm } from '../components/index.js';
import dbService from '../appwrite/database.service.js';
import { getLocalDemoPosts } from '../utils/demoPosts.js';
import { useNavigate, useParams } from 'react-router-dom';

function EditPost() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (slug) {
            dbService.getPost(slug)
                .then((res) => {
                    if (res) {
                        setPost(res);
                    } else {
                        const localPosts = getLocalDemoPosts();
                        const found = localPosts.find((p) => p.$id === slug || p.slug === slug);
                        setPost(found || null);
                    }
                })
                .catch(() => {
                    const localPosts = getLocalDemoPosts();
                    const found = localPosts.find((p) => p.$id === slug || p.slug === slug);
                    setPost(found || null);
                });
        } else {
            navigate('/');
        }
    }, [slug, navigate]);

    return post ? (
        <div className="py-12 min-h-[75vh]">
            <Container>
                <div className="mb-8">
                    <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400">
                        Editor Mode
                    </span>
                    <h1 className="text-3xl font-bold text-white mt-1">Edit Article</h1>
                </div>
                <PostForm post={post} />
            </Container>
        </div>
    ) : null;
}

export default EditPost;
