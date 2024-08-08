import React from "react";
import Project from "./Project";

function Projects(){
  return (
    <div id="projects" className="flex-container">
      <h1 className="l text-primary">Projects</h1>
      <div className="flex-container">
        <Project
          url="https://gitfront.io/r/treblabin/KNgFrk3qtsHe/cpp-chess/"
          img="../images/chess.png"
          name="Chess"
          description="A Chess Game written in C++, using the standard libraries as well as x11 for graphics. Built using OOP design patterns and effective software principles."
        />
         <Project
          url="https://itch.io/jam/gmtk-2023/rate/2163330"
          name="GMTK Game Jam"
          description="A Game built in C# and Unity where players use the power of nature to deter humans from destroying a forest."
        />
         <Project 
          name="Project 3"
          description="Vestibulum dapibus massa non ullamcorper molestie. Phasellus eget tortor vel lectus pharetra efficitur quis in lectus. Donec facilisis massa non arcu faucibus auctor."
        />
         <Project 
          name="Project 4"
          description="Vestibulum dapibus massa non ullamcorper molestie. Phasellus eget tortor vel lectus pharetra efficitur quis in lectus. Donec facilisis massa non arcu faucibus auctor."
        />
      </div>
    </div>
    
  );
}

export default Projects;