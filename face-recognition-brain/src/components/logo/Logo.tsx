import React from "react";
import { Tilt } from "react-tilt";
import "@/components/logo/logo.style.css";
import Brain from "@/assets/image/brain.png";

const defaultOptions = {
  reverse: false, // reverse the tilt direction
  max: 55, // max tilt rotation (degrees)
  perspective: 1000, // Transform perspective, the lower the more extreme the tilt gets.
  scale: 1.1, // 2 = 200%, 1.5 = 150%, etc..
  speed: 1000, // Speed of the enter/exit transition
  transition: true, // Set a transition on enter/exit.
  axis: null, // What axis should be disabled. Can be X or Y.
  reset: true, // If the tilt effect has to be reset on exit.
  easing: "cubic-bezier(.03,.98,.52,.99)", // Easing on enter/exit.
};
const Logo: React.FC = () => {
  return (
    <div className="logo_container">
      <Tilt
        className="tilt"
        options={defaultOptions}
        style={{ height: 100, width: 100 }}
      >
        <div className="tilt_inner padding_till">
          <img className="img_tilt" src={Brain} alt="Brain" />
        </div>
      </Tilt>
    </div>
  );
};

export default Logo;
