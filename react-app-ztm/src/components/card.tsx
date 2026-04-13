import React from "react";
import "../styles/crad.css";

interface CardProps {
  name: string;
  username?: string;
  email: string;
}

const Card: React.FC<CardProps> = ({ name, email }) => {
  return (
    <div className="card grow">
      <img alt="robots" src="https://robohash.org/test?200x200" />
      <div>
        <h2>Name: {name}</h2>
        <p>Email: {email}</p>
      </div>
    </div>
  );
};
export default Card;
