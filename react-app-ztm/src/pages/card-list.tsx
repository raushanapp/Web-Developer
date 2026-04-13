// import React from "react";
import "../App.css";
import Card from "../components/card";
import { robots } from "../data";
const CardList = () => {
  return (
    <div className="robo-container scroll-hide">
      {robots?.map((r) => {
        return <Card key={r.id} {...r} />;
      })}
    </div>
  );
};

export default CardList;
