import React from "react";
import "@/components/Navigation/navigation.style.css";

const Navigation: React.FC = () => {
  return (
    <nav className="nav_bar">
      <p className="sign_out_button ohover_text">Sign Out</p>
    </nav>
  );
};

export default Navigation;
