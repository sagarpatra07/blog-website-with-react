import React, { forwardRef, useId } from "react";

const SelectBtn = forwardRef(function SelectBtn(
    {
        options = [],
        label,
        className = '',
        ...props
    }, 
    ref
){
    const id = useId();
    return(
        <div className="w-full">
            {label && (
                <label htmlFor={id} className="block mb-1.5 text-xs font-semibold tracking-wider text-slate-300 uppercase">
                    {label}
                </label>
            )}
            <select 
                {...props} 
                id={id} 
                ref={ref} 
                className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-900/80 text-white border border-slate-700/80 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200 text-sm cursor-pointer ${className}`}
            >
                {options?.map((option) => (
                    <option key={option} value={option} className="bg-slate-900 text-white">
                        {option.charAt(0).toUpperCase() + option.slice(1)}
                    </option>
                ))}
            </select>
        </div>
    );
});

export default SelectBtn;