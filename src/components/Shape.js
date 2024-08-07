import React from "react";

const Shape = (props) => {
  return (
    <div className={`shape-container--${props.i} shape-animation`}>
      <div className="random-shape" />
    </div>
  );
}

export default Shape;