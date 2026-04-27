import React from "react";
import "@/components/Rank/rank.styles.css";
import "@/App.css";
interface RankProps {
  rank: number;
  name: string;
}
const Rank: React.FC<RankProps> = ({ rank, name }) => {
  return (
    <div className="rank_container center">
      <p className="text_heading">{name} your Rank is </p>
      <p className="rank_count">#{rank}</p>
    </div>
  );
};

export default Rank;
