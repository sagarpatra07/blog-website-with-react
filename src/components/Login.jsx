import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice.js";
import { Button, Input, Logo } from './index.js';
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth.service.js";
import { useForm } from "react-hook-form";

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const loginHandler = async (data) => {
        setError("");
        setLoading(true);
        try {
            await authService.login(data);
            const userData = await authService.getCurrentUser();
            if (userData) {
                dispatch(authLogin({ userData }));
                navigate("/");
            } else {
                setError("Logged in, but could not retrieve account details.");
            }
        } catch (err) {
            setError(err.message || "Invalid credentials. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[70vh] py-12 px-4">
            <div className="w-full max-w-md bg-slate-900/80 border border-slate-800/80 rounded-3xl p-8 sm:p-10 backdrop-blur-xl shadow-2xl shadow-indigo-950/20 space-y-8">
                <div className="flex flex-col items-center text-center space-y-3">
                    <Logo />
                    <h2 className="text-2xl font-bold text-white tracking-tight">Welcome back</h2>
                    <p className="text-xs text-slate-400">
                        Don&apos;t have an account?&nbsp;
                        <Link
                            to="/signup"
                            className="font-medium text-indigo-400 hover:text-indigo-300 transition-colors underline"
                        >
                            Sign Up
                        </Link>
                    </p>
                </div>

                {error && (
                    <div className="p-3.5 rounded-xl bg-rose-950/60 border border-rose-800/80 text-rose-300 text-xs font-medium text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit(loginHandler)} className="space-y-5">
                    <Input
                        label="Email Address"
                        placeholder="you@example.com"
                        type="email"
                        error={errors.email?.message}
                        {...register("email", {
                            required: "Email address is required",
                            pattern: {
                                value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                                message: "Please enter a valid email address"
                            }
                        })}
                    />

                    <Input
                        label="Password"
                        type="password"
                        placeholder="••••••••"
                        error={errors.password?.message}
                        {...register("password", {
                            required: "Password is required",
                            minLength: {
                                value: 6,
                                message: "Password must be at least 6 characters"
                            }
                        })}
                    />

                    <Button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 text-sm font-semibold"
                    >
                        {loading ? "Signing in..." : "Sign In"}
                    </Button>
                </form>
            </div>
        </div>
    );
}

export default Login;