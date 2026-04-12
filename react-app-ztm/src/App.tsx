// import React from "react";
import useCount from "./hooks/useCount";
import "./App.css";

function App() {
  const { count, incrementCount, decrementCount } = useCount();

  return (
    <div>
      <h1>React Hooks</h1>
      <div className="app">
        <button className="btnPlus" onClick={incrementCount}>
          +
        </button>
        <h1>Count A Number : {count}</h1>
        <button
          disabled={count === 0}
          className="btnMinus"
          onClick={decrementCount}
        >
          &minus;
        </button>
      </div>
    </div>
  );
}

export default App;
