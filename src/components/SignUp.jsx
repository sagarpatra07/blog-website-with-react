import React, { useState } from "react";
import authService from "../appwrite/auth.service.js";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice.js";
import { Button, Input, Logo } from "./index.js";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

function SignUp() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();

    const signUpHandler = async (data) => {
        setError("");
        setLoading(true);
        try {
            await authService.createAccount({
                email: data.email,
                password: data.password,
                name: data.fullname
            });
            const userData = await authService.getCurrentUser();
            if (userData) {
                dispatch(authLogin({ userData }));
                navigate("/");
            } else {
                setError("Account created, but could not retrieve account details.");
            }
        } catch (err) {
            setError(err.message || "Failed to create account. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[70vh] py-12 px-4">
            <div className="w-full max-w-md bg-slate-900/80 border border-slate-800/80 rounded-3xl p-8 sm:p-10 backdrop-blur-xl shadow-2xl shadow-indigo-950/20 space-y-8">
                <div className="flex flex-col items-center text-center space-y-3">
                    <Logo />
                    <h2 className="text-2xl font-bold text-white tracking-tight">Create an account</h2>
                    <p className="text-xs text-slate-400">
                        Already have an account?&nbsp;
                        <Link
                            to="/login"
                            className="font-medium text-indigo-400 hover:text-indigo-300 transition-colors underline"
                        >
                            Sign In
                        </Link>
                    </p>
                </div>

                {error && (
                    <div className="p-3.5 rounded-xl bg-rose-950/60 border border-rose-800/80 text-rose-300 text-xs font-medium text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit(signUpHandler)} className="space-y-5">
                    <Input
                        label="Full Name"
                        placeholder="Alex Johnson"
                        error={errors.fullname?.message}
                        {...register("fullname", {
                            required: "Full name is required",
                        })}
                    />

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
                                value: 8,
                                message: "Password must be at least 8 characters"
                            }
                        })}
                    />

                    <Button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 text-sm font-semibold"
                    >
                        {loading ? "Creating Account..." : "Create Account"}
                    </Button>
                </form>
            </div>
        </div>
    );
}

export default SignUp;