import React from "react";
import "@/components/Rank/rank.styles.css";
import "@/App.css";
const Rank: React.FC = () => {
  return (
    <div className="rank_container center">
      <p className="text_heading">Raushan your Rank is </p>
      <p className="rank_count">#4</p>
    </div>
  );
};

export default Rank;
