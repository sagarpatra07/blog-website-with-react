import React, {forwardRef, useId} from "react";

function Input(
  { 
    label, 
    type = 'text', 
    className = '', 
    ref,        // pull in the ref  
    ...props    // everything else  
  }
) {
    const id = useId();
    return (
        <>
            <div className="w-full">
                {/* this will only show if the label is given to the Input component */}
                {label &&
                    <label className="inline-block mb-1 pl-1" htmlFor={id}>
                        {label}
                    </label>
                }
                <input type={type} 
                className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full 
                ${className}`}
                ref={ref}
                {...props}
                id = {id} 
                />
            </div>
        </>
    )
}
export default Input;