import React, { useEffect, useState } from 'react';
import { Container, PostCard, Button } from '../components/index.js';
import dbService from '../appwrite/database.service.js';
import { getLocalDemoPosts } from '../utils/demoPosts.js';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Home() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const authStatus = useSelector((state) => state.auth.status);

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
            .catch(() => {
                setPosts(getLocalDemoPosts());
            })
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="w-full">
            {/* Hero Section */}
            <section className="relative overflow-hidden py-16 sm:py-24 border-b border-slate-800/80 bg-gradient-to-b from-slate-950 via-slate-900/50 to-slate-950">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none"></div>
                <Container className="relative z-10 text-center max-w-4xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-950/60 border border-indigo-800/50 text-indigo-400 text-xs font-semibold mb-6">
                        <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></span>
                        Minimalist Publishing Platform
                    </div>

                    <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-[1.15] mb-6">
                        Ideas that shape the <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">digital future</span>
                    </h1>

                    <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed mb-8">
                        Explore thoughtful essays, technical breakdowns, and design perspectives curated for modern creators and engineers.
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-4">
                        <Link to="/all-posts">
                            <Button className="px-6 py-3 text-sm font-semibold shadow-lg shadow-indigo-600/25">
                                Read Articles
                            </Button>
                        </Link>
                        {authStatus ? (
                            <Link to="/add-posts">
                                <Button bgColor="bg-slate-800 hover:bg-slate-700" textColor="text-slate-200" className="px-6 py-3 text-sm font-semibold border border-slate-700">
                                    Write a Story
                                </Button>
                            </Link>
                        ) : (
                            <Link to="/login">
                                <Button bgColor="bg-slate-800 hover:bg-slate-700" textColor="text-slate-200" className="px-6 py-3 text-sm font-semibold border border-slate-700">
                                    Sign In to Write
                                </Button>
                            </Link>
                        )}
                    </div>
                </Container>
            </section>

            {/* Featured Articles Section */}
            <section className="py-16">
                <Container>
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-2xl font-bold text-white tracking-tight">Recent Stories</h2>
                            <p className="text-xs text-slate-400 mt-1">Handpicked posts from our latest writers</p>
                        </div>
                        <Link to="/all-posts" className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 transition-colors">
                            View All
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </Link>
                    </div>

                    {loading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[1, 2, 3].map((n) => (
                                <div key={n} className="h-80 rounded-2xl bg-slate-900/50 border border-slate-800/80 animate-pulse p-4"></div>
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {posts.slice(0, 6).map((post) => (
                                <PostCard key={post.$id || post.slug} post={post} />
                            ))}
                        </div>
                    )}
                </Container>
            </section>
        </div>
    );
}

export default Home;
