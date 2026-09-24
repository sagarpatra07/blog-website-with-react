import React from "react";

function Button({
    children, 
    type = 'button',
    bgColor = 'bg-indigo-600 hover:bg-indigo-500',
    textColor = 'text-white',
    className = '',
    ...props
}) {
    return (
        <button 
            type={type} 
            className={`inline-flex items-center justify-center font-medium rounded-xl px-4 py-2.5 text-sm transition-all duration-200 active:scale-[0.98] shadow-sm shadow-indigo-950/20 disabled:opacity-50 cursor-pointer ${bgColor} ${textColor} ${className}`} 
            {...props}
        >
            {children}
        </button>
    );
}

export default Button;