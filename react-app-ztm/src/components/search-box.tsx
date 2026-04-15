import React from "react";
import "../styles/search-box.css";

const SearchBox = ({
  searchChange,
}: {
  searchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div className="search-box">
      <input
        type="search"
        placeholder="search robots"
        onChange={searchChange}
      />
    </div>
  );
};

export default SearchBox;
