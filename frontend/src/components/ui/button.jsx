import React from "react";
import "./ui.css";

export const Button = ({ children, className = "", variant = "primary", ...props }) => (
    <button className={`btn btn-${variant} ${className}`} {...props}>
        {children}
    </button>
);
