import { use, useEffect, useId } from "react";
import { CounterDispatchContext, TabContext } from "../context/contexts";

export function Counter({ counter }) {
  const counterDispatch = use(CounterDispatchContext);
  const visibleTab = use(TabContext);
  const id = useId();

  useEffect(() => {
    let timerId;
    let seconds = 0;
    if (counter.tab === visibleTab && counter.name.shortName === "A") {
      timerId = setInterval(() => {
        seconds = seconds + 1;
        // console.log(
        //   `Time since ${counter.name.shortName} was available and/or clicked: ${seconds}s`,
        // );
      }, 1000);
    }

    return () => {
      clearInterval(timerId);
    };
  }, [counter.name.shortName, counter.tab, counter.total, visibleTab]);

  function handleIncrementClick(event) {
    counterDispatch({ type: "increment", id: counter.id });
    event.preventDefault();
  }

  function handleDecrementClick(event) {
    counterDispatch({ type: "decrement", id: counter.id });
    event.preventDefault();
  }

  return (
    <fieldset className="counter" id={id} key={counter.id}>
      <legend className="counter_legend" id={id + "_legend"}>
        {counter.name.longName}{" "}
      </legend>
      {counter.total > 0 ? (
        <button
          className="button"
          onClick={handleDecrementClick}
          aria-label="Decrease counter"
          id={id + "-decrement"}
        >
          -
        </button>
      ) : (
        <div className="counter_emptu"></div>
      )}
      <p aria-label={id + "-legend"}>{counter.total}</p>

      <button
        className="button"
        onClick={handleIncrementClick}
        aria-label="Increase counter"
        id={id + "-increment"}
      >
        +
      </button>
    </fieldset>
  );
}
