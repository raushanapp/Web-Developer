import { useState } from "react";

export function AddCounter() {
  const [counterName, setCounterName] = useState("");
  const [startingValue, setStartingValue] = useState(0);

  return (
    <>
      <h2>Add {counterName}</h2>
      <p>
        <label htmlFor="CounterName">Name</label>
        <input
          value={counterName}
          type="text"
          id="counterName"
          onChange={(event) => setCounterName(event.target.value)}
        />
      </p>
      <p>
        <label htmlFor="startingValue">Starting Value</label>
        <input
          value={startingValue}
          type="number"
          id="startingValue"
          onChange={(event) => setStartingValue(event.target.value)}
        />
      </p>
    </>
  );
}
