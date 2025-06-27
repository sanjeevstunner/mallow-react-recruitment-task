import * as React from "react";

export const Logo: React.FC<{ className?: string }> = ({ className }) => (
  <div className={`flex items-center gap-2 font-bold text-xl tracking-tight text-primary ${className || ""}`}>
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="32" height="32" rx="8" fill="currentColor" className="text-primary" />
      <text x="16" y="21" textAnchor="middle" fontSize="16" fill="#fff" fontFamily="sans-serif">M</text>
    </svg>
    <span className="hidden sm:inline">Mallow</span>
  </div>
); 