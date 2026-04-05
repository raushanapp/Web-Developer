// import React from "react";
import useCount from "./hooks/useCount";

function App() {
  const { count, incrementCount, decrementCount } = useCount();

  return (
    <div>
      <h1>React Hooks</h1>
      <button onClick={incrementCount}>+</button>
      <h1>Count A Number : {count}</h1>
      <button onClick={decrementCount}>-</button>
    </div>
  );
}

export default App;
