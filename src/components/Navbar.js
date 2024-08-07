import React from "react";

function Navbar() {
  return (
    <div id="navbar" className="flex-container">
      <div className="nav-button text-secondary">
          <a href="#top">Home</a>
      </div>
      <div className="nav-button text-secondary">/</div>
      <div className="nav-button text-secondary">
          <a href="#about">About Me</a>
      </div>
      <div className="nav-button text-secondary">/</div>
      <div className="nav-button text-secondary">
          <a href="#projects">Projects</a>
      </div>
      <div className="nav-button text-secondary">/</div>
      <div className="nav-button text-secondary">
          <a href="#contact">Contact Me</a>
      </div>
      <div className="space" />
  </div>
  );
}

export default Navbar;
