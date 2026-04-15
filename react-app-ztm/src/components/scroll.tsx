import React from "react";
import "../styles/scroll.css";
const Scroll = ({ children }: { children: React.ReactNode }) => {
  console.log(children);
  return <div className="scroll">{children}</div>;
};

export default Scroll;
