import React, { forwardRef, useId } from "react";

const Input = forwardRef(function Input(
  { 
    label, 
    type = 'text', 
    className = '',
    error,
    ...props 
  },
  ref
) {
    const id = useId();
    return (
        <div className="w-full">
            {label && (
                <label className="block mb-1.5 text-xs font-semibold tracking-wider text-slate-300 uppercase" htmlFor={id}>
                    {label}
                </label>
            )}
            <input 
                type={type} 
                className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-900/80 text-white placeholder-slate-500 border border-slate-700/80 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200 text-sm ${className}`}
                ref={ref}
                {...props}
                id={id} 
            />
            {error && (
                <p className="mt-1 text-xs text-rose-400 font-medium">{error}</p>
            )}
        </div>
    );
});

export default Input;