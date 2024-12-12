import React, { useContext } from "react";
import { Number1 } from "./Myusecontext";

const Usethatcontext = () => {
  const omkarnumber = useContext(Number1); // Consume the context

  return (
    <>
      <h1>The number that I got from Myusecontext is: {omkarnumber}</h1>
    </>
  );
};

export default Usethatcontext;
