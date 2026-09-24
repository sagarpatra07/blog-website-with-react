import React from "react";

function Logo({ width = "100px", className = "" }) {
  return (
    <div className={`flex items-center gap-2.5 font-bold tracking-tight ${className}`}>
      <span className="text-xl font-extrabold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
        Devlog
      </span>
    </div>
  );
}

export default Logo;