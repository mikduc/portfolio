import React from "react";

const Project = (props) => {

  return (
    <div className="project flex-container">
      <div className="icon" onClick={()=>{window.open(`${props.url}`)}} style={{cursor: "pointer"}}>
        <img src={props.img} width="250px" height="250px" style={{zIndex: "2"}}/>
      </div>
      <h2 className="m text-secondary">{props.name}</h2>
      <h3 className="s text-secondary">{props.description}</h3>
    </div>
  );
}

export default Project;