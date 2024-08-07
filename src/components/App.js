import React from "react";
import Navbar from "./Navbar";
import Welcome from "./Welcome";
import About from "./About";
import Projects from "./Projects";
import Contact from "./Contact";

const now = new Date().toLocaleTimeString();

function App() {
  return (
    <div>
      <Navbar />
      <Welcome />
      <About />
      <Projects />
      <Contact />
    </div>
    
  );
}

export default App;