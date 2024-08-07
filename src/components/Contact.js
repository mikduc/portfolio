import React from "react";

function Contact() {
  return (
    <div id="contact" className="flex-container">
      <h1 className="m text-primary">Contact Me</h1>
      <div className="socials flex-container">
          <div className="card flex-container">
              <img src={require("../images/instagram.png")}/>
              <a href="https://instagram.com/mik.duc " target="_blank" className="text-secondary m">Instagram</a>
          </div>
          <div className="card flex-container">
              <img src={require("../images/linkedin.png")}/>
              <a href="https://linkedin.com/in/ryanfang01 " target="_blank" className="text-secondary m">LinkedIn</a>
          </div>
          <div className="card flex-container">
              <img src={require("../images/github.png")}/>
              <a href="https://github.com/mikduc " target="_blank" className="text-secondary m">GitHub</a>
          </div>
      </div>
      <div className="watermark flex-container text-tertiary">
          @ Ryan Fang 2024
      </div>
    </div>
  );
}

export default Contact;