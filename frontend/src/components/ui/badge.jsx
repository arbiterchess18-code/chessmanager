import React from "react";
import "./ui.css";

export const Badge = ({ children, className = "", variant = "default" }) => (
    <span className={`badge badge-${variant} ${className}`}>
        {children}
    </span>
);
