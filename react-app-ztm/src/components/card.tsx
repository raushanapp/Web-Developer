import React from "react";
import "../styles/crad.css";

interface CardProps {
  name: string;
  username?: string;
  email: string;
  id: number;
}

const Card: React.FC<CardProps> = ({ name, email, id }) => {
  return (
    <div className="card grow">
      <img alt="robots" src={`https://robohash.org/${id}?size=200x200`} />
      <div>
        <h2>Name: {name}</h2>
        <p>Email: {email}</p>
      </div>
    </div>
  );
};
export default Card;
