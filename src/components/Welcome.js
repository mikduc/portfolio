import React, { useState, useEffect } from "react";
import Shape from "./Shape";

const Welcome = () => {

  const date = new Date();
  const [state, setState] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => { setState(state + 1); }, 1000);
    return () => clearInterval(interval);
  }, [state]);

  const createShapes = (obj) => {
    return <Shape key={obj.i} i={obj.i} />;
  }

  var arr = [];
  for (var i = 1; i <= 60; i ++) {
    arr.push({key: `${i}`, i: `${i}`});
  }

  return (
    <div id="welcome" className="grid-container">
      <div className="title flex-container">
        <p className="text-secondary m">Hi! I'm Ryan.</p>
        <p className="text-primary xl heavy">Welcome to my portfolio!</p>
        <p className="text-secondary m">You've been here for
          {state >= 60 ? ` ${(Math.floor(state/60))} minute${state >= 120 ? "s" : ""} and ` : ""}
          {` ${state%60} second${state%60 == 1 ? "" : "s"}`}.</p>
      </div>
      <div style={{position: "absolute", width: "100vw", zIndex: "-1"}}>{arr.map(createShapes)}</div>
    </div>
  );
}

export default Welcome;