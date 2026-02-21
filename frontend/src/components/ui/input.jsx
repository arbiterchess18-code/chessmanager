import React from "react";
import "./ui.css";

export const Input = ({ className = "", ...props }) => (
    <input className={`input ${className}`} {...props} />
);
