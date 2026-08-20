const rootNode = document.getElementById("app");
const root = ReactDOM.createRoot(rootNode);
root.render(<App />);

/* objects */
class CounterObj {
  constructor(id, name, tab, total) {
    this.id = id;
    this.name = name;
    this.tab = tab;
    this.total = total;
  }
}

/*End  objects */

//  context
const CounterContext = React.createContext(null);
const CounterDispatchContext = React.createContext(null);
const TabContext = React.createContext(null);
const TabDispatchContext = React.createContext(null);

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
  const [counterData, counterDispatch] = React.useReducer(counterReducer, [
    new CounterObj(1, "A", 1, 0),
    new CounterObj(2, "B", 2, 0),
    new CounterObj(3, "C", 1, 0),
  ]);

  const [visibleTab, visibleDispatch] = React.useReducer(tabReducer, 1);

  return (
    <>
      <CounterContext.Provider value={counterData}>
        <CounterDispatchContext.Provider value={counterDispatch}>
          <TabContext.Provider value={visibleTab}>
            <TabDispatchContext.Provider value={visibleDispatch}>
              <h1>Counters</h1>
              <section>
                <CounterList />
                <CounterTools />
              </section>
            </TabDispatchContext.Provider>
          </TabContext.Provider>
        </CounterDispatchContext.Provider>
      </CounterContext.Provider>
    </>
  );
}

function useDocumentTitle(title) {
  return React.useEffect(() => {
    const originalTitle = document.title;
    document.title = title;
    return () => {
      document.title = originalTitle;
    };
  }, [title]);
}

// CounterList
function CounterList() {
  const counterData = React.useContext(CounterContext);
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
      {counterData?.map((counter) => (
        <Counter key={counter.id} counter={counter} />
      ))}
    </section>
  );
}

function Counter({ counter }) {
  const id = React.useId();
  const counterDispatch = React.useContext(CounterDispatchContext);
  function handleIncrementClick(event) {
    counterDispatch({ type: "increment", id: counter.id });
    event.preventDefault();
  }

  function handleDecrementClick(event) {
    counterDispatch({ type: "decrement", id: counter.id });
    event.preventDefault();
  }

  return (
    <fieldset className="counter" id={id}>
      <legend className="counter_legend" id={id + "_legend"}>
        Counter {counter.name}{" "}
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
  const counterData = React.useContext(CounterContext);
  const visibleTab = React.useContext(TabContext);
  const tabDispatch = React.useContext(TabDispatchContext);

  const sortData = [...counterData].sort((a, b) => {
    return b.total - a.total;
  });
  //  this example of useMemo to memoizing the value
  const filterSortedData = React.useMemo(() => {
    console.log("Filtering Data");
    return sortData.filter((counter) => counter.tab === visibleTab);
  }, [visibleTab]);

  console.log(filterSortedData[0].total);

  const setVisibleTab1 = React.useCallback((event) => {
    tabDispatch({ type: "change-tab", tab: 1 });
    event.preventDefault();
  }, []);

  const setVisibleTab2 = React.useCallback((event) => {
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

const CounterSummaryHeader = React.memo(function CounterSummaryHeader({
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

const CounterSummaryDetails = React.memo(function CounterSummaryDetails({
  name,
  total,
}) {
  return (
    <p>
      {name} ({total})
    </p>
  );
});
