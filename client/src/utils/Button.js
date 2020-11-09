import React from "react";
import "./ButtonStyle.css";

const Button = ({ btnStyle, children }) => {
    return <button className={btnStyle}>{children}</button>;
};

export default Button;
