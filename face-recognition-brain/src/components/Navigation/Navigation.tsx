import React from "react";
import "@/components/Navigation/navigation.style.css";

interface NavigationProps {
  isLoggedIn: boolean;
  onSignOut: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ isLoggedIn, onSignOut }) => {
  return (
    <nav className="nav_bar">
      <button className="sign_out_button" onClick={onSignOut}>
        {isLoggedIn ? "Sign Out" : "Sign In"}
      </button>
    </nav>
  );
};

export default Navigation;
