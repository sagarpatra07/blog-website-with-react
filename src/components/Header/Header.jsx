import React, { useState } from "react";
import { Container, Logo, LogoutBtn } from '../index.js';
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
    const authStatus = useSelector((state) => state.auth.status);
    const userData = useSelector((state) => state.auth.userData);
    const navigate = useNavigate();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navItems = [
        {
            name: "Home",
            slug: "/",
            active: true
        },
        {
            name: "All Posts",
            slug: "/all-posts",
            active: true
        },
        {
            name: "Add Post",
            slug: "/add-posts",
            active: authStatus
        },
        {
            name: "Sign In",
            slug: "/login",
            active: !authStatus
        },
        {
            name: "Get Started",
            slug: "/signup",
            active: !authStatus,
            isPrimary: true
        },
    ];

    return (
        <header className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/80 border-b border-slate-800/80">
            <Container>
                <nav className="flex items-center justify-between h-16">
                    <div className="flex items-center gap-6">
                        <Link to="/" className="flex items-center transition hover:opacity-90">
                            <Logo />
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <ul className="hidden md:flex items-center gap-1.5">
                        {navItems.map((item) =>
                            item.active ? (
                                <li key={item.name}>
                                    <NavLink
                                        to={item.slug}
                                        className={({ isActive }) =>
                                            item.isPrimary
                                                ? "inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl shadow-md shadow-indigo-600/20 transition-all duration-200"
                                                : `inline-flex items-center px-3.5 py-2 text-sm font-medium rounded-xl transition-all duration-200 ${
                                                      isActive
                                                          ? "text-indigo-400 bg-indigo-950/40 border border-indigo-800/50"
                                                          : "text-slate-300 hover:text-white hover:bg-slate-800/60"
                                                  }`
                                        }
                                    >
                                        {item.name}
                                    </NavLink>
                                </li>
                            ) : null
                        )}

                        {authStatus && (
                            <li className="ml-2 pl-3 border-l border-slate-800 flex items-center gap-3">
                                {userData?.name && (
                                    <span className="text-xs text-slate-400 font-medium">
                                        Hi, {userData.name}
                                    </span>
                                )}
                                <LogoutBtn />
                            </li>
                        )}
                    </ul>

                    {/* Mobile Hamburger */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none"
                    >
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            {mobileMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </nav>

                {/* Mobile Navigation Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden py-4 border-t border-slate-800 space-y-2">
                        {navItems.map((item) =>
                            item.active ? (
                                <button
                                    key={item.name}
                                    onClick={() => {
                                        navigate(item.slug);
                                        setMobileMenuOpen(false);
                                    }}
                                    className="w-full text-left px-4 py-2.5 text-sm font-medium text-slate-200 hover:bg-slate-800 rounded-lg transition-colors"
                                >
                                    {item.name}
                                </button>
                            ) : null
                        )}
                        {authStatus && (
                            <div className="pt-2 px-4 border-t border-slate-800 flex items-center justify-between">
                                {userData?.name && (
                                    <span className="text-xs text-slate-400 font-medium">
                                        {userData.name}
                                    </span>
                                )}
                                <LogoutBtn />
                            </div>
                        )}
                    </div>
                )}
            </Container>
        </header>
    );
}

export default Header;