import React from 'react';
import { Link } from 'react-router-dom';
import { Logo, Container } from '../index.js';

function Footer() {
  return (
    <footer className="mt-auto bg-slate-100 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800/80 py-12 text-slate-600 dark:text-slate-400 text-sm transition-colors duration-500">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-4">
            <Logo />
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm leading-relaxed">
              A modern, minimal blogging platform built with React, Redux Toolkit, and Appwrite. Share your thoughts with the world in style.
            </p>
          </div>
          <div>
            <h4 className="text-xs font-semibold text-slate-900 dark:text-slate-200 uppercase tracking-wider mb-4">Platform</h4>
            <ul className="space-y-2.5">
              <li><Link to="/" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Home</Link></li>
              <li><Link to="/all-posts" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Explore Articles</Link></li>
              <li><Link to="/add-posts" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Write Post</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-semibold text-slate-900 dark:text-slate-200 uppercase tracking-wider mb-4">Resources</h4>
            <ul className="space-y-2.5">
              <li><a href="https://appwrite.io" target="_blank" rel="noreferrer" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Appwrite Docs</a></li>
              <li><a href="https://react.dev" target="_blank" rel="noreferrer" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">React Documentation</a></li>
              <li><a href="https://tailwindcss.com" target="_blank" rel="noreferrer" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Tailwind CSS</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-semibold text-slate-900 dark:text-slate-200 uppercase tracking-wider mb-4">Account</h4>
            <ul className="space-y-2.5">
              <li><Link to="/login" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Sign In</Link></li>
              <li><Link to="/signup" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Create Account</Link></li>
            </ul>
          </div>
        </div>
        <div className="pt-6 border-t border-slate-200 dark:border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>&copy; {new Date().getFullYear()} Devlog. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="hover:text-slate-700 dark:hover:text-slate-400 transition-colors cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-700 dark:hover:text-slate-400 transition-colors cursor-pointer">Terms of Service</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;