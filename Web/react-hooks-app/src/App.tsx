import { useCallback, useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  const incrementCount = useCallback(() => {
    setCount((prev) => {
      const newValue = prev + 1;
      console.log("Plus", newValue);
      return newValue;
    });
  }, []);

  const decrementCount = useCallback(() => {
    setCount((prev) => {
      const newValue = prev - 1;
      console.log("Minus", newValue);
      return newValue;
    });
  }, []);

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
