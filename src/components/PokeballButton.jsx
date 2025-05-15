import React from "react";
import "../styles/App.css";

const PokeballButton = ({ onClick, className = "" }) => (
  <button className={`pokeball-add-btn ${className}`} onClick={onClick}>
    <span className="pokeball-top" />
    <span className="pokeball-bottom" />
    <span className="pokeball-line" />
    <span className="pokeball-center" />
    <span className="pokeball-plus">+</span>
  </button>
);

export default PokeballButton;
