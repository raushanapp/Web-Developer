import { useState } from "react";
import { CounterDispatchContext } from "../context/contexts";
import { use } from "react";

export function AddCounter() {
  const counterDispatch = use(CounterDispatchContext);
  const [counterShortName, setCounterShortName] = useState("");
  const [counterLongName, setCounterLongName] = useState("");
  const [tab, setTab] = useState(1);
  const [startingValue, setStartingValue] = useState(1);

  const handleSubmit = (event) => {
    event.preventDefault();
    counterDispatch({
      type: "add",
      data: {
        shortName: counterShortName,
        longName: counterLongName,
        tab: Number(tab),
        startingValue: Number(startingValue),
      },
    });
    // console.log(counterShortName);
    // console.log(startingValue);
    // const form = event.target;
    // const formData = new FormData(form);
    // console.log(...formData);

    // //  another way

    // const formJson = Object.fromEntries(formData.entries());
    // console.log("Another ===>>>", formJson);
  };

  return (
    <>
      <form method="post" onSubmit={handleSubmit}>
        <h2> Add {counterShortName}</h2>
        <p>
          <label htmlFor="counterShortName">Short Name</label>
          <input
            value={counterShortName}
            type="text"
            id="counterShortName"
            name="counterShortName"
            onChange={(event) => setCounterShortName(event.target.value)}
          />
        </p>
        <p>
          <label htmlFor="counterLongName">Long Name</label>
          <textarea
            value={counterLongName}
            type="text"
            id="counterLongName"
            name="counterLongName"
            onChange={(event) => setCounterLongName(event.target.value)}
          />
        </p>

        <p>
          <label htmlFor="tab">Tab</label>
          <select
            name="tab"
            id="tab"
            value={tab}
            onChange={(event) => setTab(event.target.value)}
          >
            <option value="1">1</option>
            <option value="2">2</option>
          </select>
        </p>
        <p>
          <label htmlFor="startingValue">Starting Value</label>
          <input
            value={startingValue}
            type="number"
            id="startingValue"
            name="startingValue"
            onChange={(event) => setStartingValue(event.target.value)}
          />
        </p>

        <button type="submit">Add</button>
      </form>
    </>
  );
}
