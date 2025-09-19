import React from "react";
import "../styles/main.css";

const PokeballButton = React.memo(({ onClick, className = "" }) => (
  <button className={`pokeball-add-btn ${className}`} onClick={onClick}>
    <span className="pokeball-top" />
    <span className="pokeball-bottom" />
    <span className="pokeball-line" />
    <span className="pokeball-center" />
    <span className="pokeball-plus">+</span>
  </button>
));

PokeballButton.displayName = "PokeballButton";

export default PokeballButton;
