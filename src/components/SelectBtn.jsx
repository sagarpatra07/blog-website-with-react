import React, {useId} from "react";

function SelectBtn({
    options = [],
    label,
    className = '',
    ...props
}, ref){

    const id = useId();
    return(
        <>
            <div className="w-full">
                {label && (
                    <label htmlFor={id} className={`${className}`}></label>
                )}
                <select {...props} id = {id} ref={ref} className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border broder-gray-200 w-full ${className}`}>
                    {/* the ? used as an optional condition i.e. if there are options then it'll enter loop else it won't */}
                    {options?.map((option) => (
                        <option key={option} val={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </div>
        </>
    )
}

export default SelectBtn;