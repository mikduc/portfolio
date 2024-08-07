import React, { useState, useEffect } from "react";


const Welcome = () => {

  const date = new Date();
  const [state, setState] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => { setState(state + 1); }, 1000);
    return () => clearInterval(interval);
  }, [state]);

  return (
    <div id="welcome" className="grid-container">
      <div className="title flex-container">
        <p className="text-secondary m">Hi! I'm Ryan.</p>
        <p className="text-primary xl heavy">Welcome to my portfolio!</p>
        <p className="text-secondary m">You've been here for {state} seconds.</p>
      </div>
    </div>
  );
}

export default Welcome;