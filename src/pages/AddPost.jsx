import React from "react";
import { Container, PostForm } from "../components/index.js";

function AddPost() {
    return (
        <div className="py-12 min-h-[75vh]">
            <Container>
                <div className="mb-8">
                    <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400">
                        Create Content
                    </span>
                    <h1 className="text-3xl font-bold text-white mt-1">Publish New Article</h1>
                </div>
                <PostForm />
            </Container>
        </div>
    );
}

export default AddPost;