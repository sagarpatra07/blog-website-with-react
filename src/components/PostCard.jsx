import React from "react";
import { Link } from "react-router-dom";
import storageService from "../appwrite/storage.service.js";

function PostCard({ post, $id, title, featuredImage }) {
    const id = post?.$id || $id || post?.slug;
    const postTitle = post?.title || title || "Untitled Article";
    const image = post?.featuredImage || post?.featuredimage || post?.featured_image || featuredImage;
    const author = post?.authorName || "Editorial Team";
    const readTime = post?.readTime || "4 min read";
    const imageUrl = storageService.getFilePreview(image);

    return (
        <Link to={`/post/${id}`} className="group block h-full">
            <div className="h-full flex flex-col bg-slate-900/60 dark:bg-slate-900/60 light:bg-white dark:hover:bg-slate-900 light:hover:bg-slate-50 border border-slate-800/80 dark:border-slate-800/80 light:border-slate-200/80 rounded-2xl overflow-hidden transition-all duration-500 shadow-md hover:shadow-indigo-500/10">
                <div className="w-full aspect-[16/9] overflow-hidden bg-slate-950 dark:bg-slate-950 light:bg-slate-100 relative">
                    <img 
                        src={imageUrl} 
                        alt={postTitle} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80";
                        }}
                    />
                    <div className="absolute top-3 left-3 bg-slate-950/70 dark:bg-slate-950/70 light:bg-white/80 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-medium text-slate-300 dark:text-slate-300 light:text-slate-700 border border-slate-800 dark:border-slate-800 light:border-slate-300">
                        Article
                    </div>
                </div>
                <div className="p-5 flex flex-col flex-grow justify-between space-y-4">
                    <div>
                        <div className="flex items-center gap-2 text-xs text-slate-400 dark:text-slate-400 light:text-slate-500 mb-2 font-medium">
                            <span>{author}</span>
                            <span>•</span>
                            <span>{readTime}</span>
                        </div>
                        <h3 className="text-lg font-bold text-white dark:text-white light:text-slate-900 group-hover:text-indigo-400 dark:group-hover:text-indigo-400 light:group-hover:text-indigo-600 transition-colors line-clamp-2 leading-snug">
                            {postTitle}
                        </h3>
                    </div>
                    <div className="pt-2 flex items-center text-xs font-semibold text-indigo-400 dark:text-indigo-400 light:text-indigo-600 group-hover:translate-x-1 transition-transform">
                        Read Story
                        <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default PostCard;