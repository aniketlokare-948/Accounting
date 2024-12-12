import React, { createContext, useState } from "react";
import Usethatcontext from "./Usethatcontext";

// Create the context outside of the component
const Number1 = createContext();

// Myusecontext Component: This provides the context value
const Myusecontext = () => {
  const [number, setNumber] = useState(13); // State for the number

  return (
    <Number1.Provider value={number}>
      <div>
        <h1>Number in Myusecontext: {number}</h1>
        {/* This component is inside the Provider */}
        <Usethatcontext />
      </div>
    </Number1.Provider>
  );
};

export default Myusecontext;
export { Number1 };
