import React from "react";
import Project from "./Project";

function Projects(){
  return (
    <div id="projects" className="flex-container">
      <h1 className="l text-primary">Projects</h1>
      <div className="flex-container">
        <Project
          url="https://gitfront.io/r/treblabin/KNgFrk3qtsHe/cpp-chess/"
          name="Chess"
          description="A C++ Chess Game with a well-structured design, ensuring robustness and user-friendliness through effective software principles."
        />
         <Project 
          name="Chess"
          description="Vestibulum dapibus massa non ullamcorper molestie. Phasellus eget tortor vel lectus pharetra efficitur quis in lectus. Donec facilisis massa non arcu faucibus auctor."
        />
         <Project 
          name="Chess"
          description="Vestibulum dapibus massa non ullamcorper molestie. Phasellus eget tortor vel lectus pharetra efficitur quis in lectus. Donec facilisis massa non arcu faucibus auctor."
        />
         <Project 
          name="Chess"
          description="Vestibulum dapibus massa non ullamcorper molestie. Phasellus eget tortor vel lectus pharetra efficitur quis in lectus. Donec facilisis massa non arcu faucibus auctor."
        />
      </div>
    </div>
    
  );
}

export default Projects;