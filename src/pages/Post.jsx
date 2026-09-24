import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import dbService from "../appwrite/database.service.js";
import storageService from "../appwrite/storage.service.js";
import { Button, Container } from "../components/index.js";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import { getLocalDemoPosts, saveLocalDemoPost } from "../utils/demoPosts.js";

function Post() {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);
    const isAuthor = post && userData ? (post.userId === userData.$id || !post.userId) : true;

    useEffect(() => {
        if (slug) {
            setLoading(true);
            dbService.getPost(slug)
                .then((res) => {
                    if (res) {
                        setPost(res);
                    } else {
                        const localPosts = getLocalDemoPosts();
                        const found = localPosts.find((p) => p.$id === slug || p.slug === slug);
                        setPost(found || localPosts[0]);
                    }
                })
                .catch(() => {
                    const localPosts = getLocalDemoPosts();
                    const found = localPosts.find((p) => p.$id === slug || p.slug === slug);
                    setPost(found || localPosts[0]);
                })
                .finally(() => setLoading(false));
        } else {
            navigate("/");
        }
    }, [slug, navigate]);

    const deletePostHandler = () => {
        if (window.confirm("Are you sure you want to delete this article?")) {
            dbService.deletePost(post.$id || post.slug)
                .then((status) => {
                    if (status) {
                        if (post.featuredImage) {
                            storageService.deleteFile(post.featuredImage);
                        }
                    }
                    // Clean up local storage if fallback
                    const local = getLocalDemoPosts().filter(p => p.$id !== post.$id && p.slug !== post.slug);
                    try { localStorage.setItem("demo_posts", JSON.stringify(local)); } catch(e){}
                    navigate("/");
                });
        }
    };

    if (loading) {
        return (
            <div className="py-20 text-center">
                <div className="w-10 h-10 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin mx-auto"></div>
                <p className="text-xs text-slate-400 mt-4">Loading article...</p>
            </div>
        );
    }

    if (!post) {
        return (
            <div className="py-20 text-center">
                <h2 className="text-xl font-bold text-white mb-2">Post Not Found</h2>
                <Link to="/all-posts" className="text-sm text-indigo-400 hover:underline">
                    Back to all articles
                </Link>
            </div>
        );
    }

    const imageUrl = storageService.getFilePreview(post.featuredImage);

    return (
        <div className="py-12 min-h-[80vh]">
            <Container className="max-w-4xl">
                {/* Back button & Action controls */}
                <div className="flex items-center justify-between mb-8">
                    <Link to="/all-posts" className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Articles
                    </Link>

                    {isAuthor && (
                        <div className="flex items-center gap-3">
                            <Link to={`/edit-post/${post.$id || post.slug}`}>
                                <Button bgColor="bg-emerald-600 hover:bg-emerald-500" className="px-3.5 py-1.5 text-xs">
                                    Edit Article
                                </Button>
                            </Link>
                            <Button onClick={deletePostHandler} bgColor="bg-rose-600 hover:bg-rose-500" className="px-3.5 py-1.5 text-xs">
                                Delete Article
                            </Button>
                        </div>
                    )}
                </div>

                {/* Article Header */}
                <div className="space-y-4 mb-8">
                    <span className="inline-block px-3 py-1 rounded-full bg-indigo-950/60 border border-indigo-800/50 text-indigo-400 text-xs font-semibold">
                        {post.status === "active" ? "Published Article" : "Draft"}
                    </span>
                    <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                        {post.title}
                    </h1>

                    <div className="flex items-center gap-4 text-xs text-slate-400 pt-2 border-b border-slate-800/80 pb-6">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center font-bold text-white text-xs">
                                {(post.authorName || "A")[0]}
                            </div>
                            <span className="text-slate-200 font-medium">{post.authorName || "Editorial Team"}</span>
                        </div>
                        <span>•</span>
                        <span>{post.readTime || "5 min read"}</span>
                        {post.createdAt && (
                            <>
                                <span>•</span>
                                <span>{post.createdAt}</span>
                            </>
                        )}
                    </div>
                </div>

                {/* Featured Hero Image */}
                {imageUrl && (
                    <div className="w-full aspect-[21/9] rounded-3xl overflow-hidden mb-10 border border-slate-800/80 bg-slate-950 shadow-2xl">
                        <img
                            src={imageUrl}
                            alt={post.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80";
                            }}
                        />
                    </div>
                )}

                {/* Article Body Content */}
                <article className="prose prose-invert max-w-none text-slate-300 leading-relaxed text-base sm:text-lg space-y-6">
                    {parse(post.content || "")}
                </article>
            </Container>
        </div>
    );
}

export default Post;
