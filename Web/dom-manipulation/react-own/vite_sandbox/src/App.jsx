import {
  // useState,
  use,
  useMemo,
  memo,
  useCallback,
  useId,
  useEffect,
  createContext,
  useReducer,
} from "react";
import "./App.css";
class CounterObj {
  constructor(id, name, tab, total) {
    this.id = id;
    this.name = name;
    this.tab = tab;
    this.total = total;
  }
}

//  context
const CounterContext = createContext(null);
const CounterDispatchContext = createContext(null);
const TabContext = createContext(null);
const TabDispatchContext = createContext(null);

function counterReducer(counterData, action) {
  switch (action.type) {
    case "increment": {
      return counterData.map((counter) => {
        if (counter.id === action.id) {
          return { ...counter, total: counter.total + 1 };
        } else {
          return counter;
        }
      });
    }
    case "decrement": {
      return counterData.map((counter) => {
        if (counter.id === action.id) {
          return {
            ...counter,
            total: counter.total >= 0 ? counter.total - 1 : 0,
          };
        } else {
          return counter;
        }
      });
    }
    default: {
      throw Error("Unknown action" + action.type);
    }
  }
}

function tabReducer(visibleTab, action) {
  switch (action.type) {
    case "change-tab": {
      if (action.tab === visibleTab) {
        return visibleTab;
      } else {
        return action.tab;
      }
    }
    default: {
      throw Error("Unknown action" + action.type);
    }
  }
}

function App() {
  const [counterData, counterDispatch] = useReducer(counterReducer, [
    new CounterObj(1, { longName: "Counter A", shortName: "A" }, 1, 0),
    new CounterObj(2, { longName: "Counter B", shortName: "B" }, 2, 0),
    new CounterObj(3, { longName: "Counter C", shortName: "C" }, 1, 0),
  ]);

  const [visibleTab, visibleDispatch] = useReducer(tabReducer, 1);

  return (
    <>
      <CounterContext value={counterData}>
        <CounterDispatchContext value={counterDispatch}>
          <TabContext value={visibleTab}>
            <TabDispatchContext value={visibleDispatch}>
              <h1>Counters</h1>
              <section>
                <CounterList />
                <CounterTools />
              </section>
            </TabDispatchContext>
          </TabContext>
        </CounterDispatchContext>
      </CounterContext>
    </>
  );
}

function useDocumentTitle(title) {
  return useEffect(() => {
    const originalTitle = document.title;
    document.title = title;
    return () => {
      document.title = originalTitle;
    };
  }, [title]);
}

// CounterList
function CounterList() {
  const counterData = use(CounterContext);
  useDocumentTitle(
    "Clicks : " +
      counterData
        ?.map((counter) => {
          return counter.total;
        })
        .join(","),
  );

  return (
    <section>
      {counterData.map((counter) => (
        <Counter key={counter.id} counter={counter} />
      ))}
    </section>
  );
}

function Counter({ counter }) {
  const counterDispatch = use(CounterDispatchContext);
  const visibleTab = use(TabContext);
  const id = useId();

  useEffect(() => {
    let timerId;
    let seconds = 0;
    if (counter.tab === visibleTab && counter.name.shortName === "A") {
      timerId = setInterval(() => {
        seconds++;
        console.log(
          `Time since ${counter.name.shortName} was available and/or clicked: ${seconds}s`,
        );
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

function CounterTools() {
  return <CounterSummary />;
}

function CounterSummary() {
  const counterData = use(CounterContext);
  const visibleTab = use(TabContext);
  const tabDispatch = use(TabDispatchContext);

  const sortData = [...counterData].sort((a, b) => {
    return b.total - a.total;
  });
  //  this example of useMemo to memoizing the value
  const filterSortedData = useMemo(() => {
    // console.log("Filtering Data");
    return sortData.filter((counter) => counter.tab === visibleTab);
  }, [sortData, visibleTab]);

  const setVisibleTab1 = useCallback((event) => {
    tabDispatch({ type: "change-tab", tab: 1 });
    event.preventDefault();
  }, []);

  const setVisibleTab2 = useCallback((event) => {
    tabDispatch({ type: "change-tab", tab: 2 });
    event.preventDefault();
  }, []);
  return (
    <section>
      <CounterSummaryHeader
        setVisibleTab1={setVisibleTab1}
        setVisibleTab2={setVisibleTab2}
      />
      {filterSortedData.map((counter) => (
        <CounterSummaryDetails
          name={counter.name}
          total={counter.total}
          key={counter.id}
        />
      ))}
    </section>
  );
}

const CounterSummaryHeader = memo(function CounterSummaryHeader({
  setVisibleTab1,
  setVisibleTab2,
}) {
  return (
    <header>
      <a href="#" onClick={setVisibleTab1}>
        Tab 1
      </a>{" "}
      &nbsp;&nbsp; | &nbsp;&nbsp;{" "}
      <a href="#" onClick={setVisibleTab2}>
        Tab 2
      </a>
    </header>
  );
});

const CounterSummaryDetails = memo(function CounterSummaryDetails({
  name,
  total,
}) {
  // name.shortName = name.shortName + ":"; how should fixed this we
  //  we need first copy the object and create new object
  const cName = { ...name, shortName: name.shortName + ":" };
  return (
    <p>
      {cName.shortName} ({total})
    </p>
  );
});

export default App;
