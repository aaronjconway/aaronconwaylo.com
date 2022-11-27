import React from "react";
import "./PriceInput.css";

const PriceInput = ({ className, value, onClick }) => {
  return (
    <button className={className} onClick={onClick}>
      {value}
    </button>
  );
};

export default Button;
