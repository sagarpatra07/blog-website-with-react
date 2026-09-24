import React, { useState, useEffect } from "react";
import { Container, PostCard } from "../components/index.js";
import dbService from "../appwrite/database.service.js";
import { getLocalDemoPosts } from "../utils/demoPosts.js";

function AllPosts() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        setLoading(true);
        dbService.getAllPost([])
            .then((res) => {
                if (res && res.documents && res.documents.length > 0) {
                    setPosts(res.documents);
                } else {
                    setPosts(getLocalDemoPosts());
                }
            })
            .catch((error) => {
                console.log("Appwrite error fetching posts, loading local posts", error);
                setPosts(getLocalDemoPosts());
            })
            .finally(() => setLoading(false));
    }, []);

    const filteredPosts = posts.filter(post => 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (post.content && post.content.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="w-full py-12 min-h-[75vh]">
            <Container>
                {/* Header section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
                    <div>
                        <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400">
                            Explore Library
                        </span>
                        <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-1">
                            All Articles
                        </h1>
                        <p className="text-sm text-slate-400 mt-2">
                            Discover insights, tutorials, and perspectives from our writers.
                        </p>
                    </div>

                    {/* Search Input */}
                    <div className="w-full md:w-72">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search articles..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-sm text-white placeholder-slate-500 outline-none focus:border-indigo-500 transition-colors"
                            />
                            <svg className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Loading skeleton */}
                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3, 4, 5, 6].map((n) => (
                            <div key={n} className="h-80 rounded-2xl bg-slate-900/50 border border-slate-800/80 animate-pulse p-4 flex flex-col justify-between">
                                <div className="w-full h-40 bg-slate-800 rounded-xl mb-4"></div>
                                <div className="h-4 bg-slate-800 rounded w-3/4 mb-2"></div>
                                <div className="h-4 bg-slate-800 rounded w-1/2"></div>
                            </div>
                        ))}
                    </div>
                ) : filteredPosts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredPosts.map((post) => (
                            <PostCard key={post.$id || post.slug} post={post} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16 bg-slate-900/40 rounded-3xl border border-slate-800/80">
                        <svg className="w-12 h-12 text-slate-600 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                        </svg>
                        <p className="text-slate-300 font-medium">No matching posts found</p>
                        <p className="text-xs text-slate-500 mt-1">Try adjusting your search terms</p>
                    </div>
                )}
            </Container>
        </div>
    );
}

export default AllPosts;