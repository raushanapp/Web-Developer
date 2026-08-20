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

function App() {
  const [counterData, setCounterData] = React.useState([
    new CounterObj(1, "A", 1, 0),
    new CounterObj(2, "B", 2, 0),
    new CounterObj(3, "C", 1, 0),
  ]);

  const [visibleTab, setVisibleTab] = React.useState(1);

  const increment = (index) => {
    const newData = [...counterData];
    newData[index].total = newData[index].total + 1;
    setCounterData(newData);
  };

  const decrement = (index) => {
    const newData = [...counterData];
    const decrementedCounter = newData[index].total - 1;
    newData[index].total = decrementedCounter >= 0 ? decrementedCounter : 0;
    setCounterData(newData);
  };

  return (
    <>
      <h1>Counters</h1>
      <section>
        <CounterList
          counterData={counterData}
          increment={increment}
          decrement={decrement}
        />
        <CounterTools
          counterData={counterData}
          visibleTab={visibleTab}
          setVisibleTab={setVisibleTab}
        />
      </section>
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
function CounterList({ counterData, increment, decrement }) {
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
      {counterData?.map((counter, index) => (
        <Counter
          key={counter.id}
          counter={counter}
          increment={increment}
          decrement={decrement}
          index={index}
        />
      ))}
    </section>
  );
}

function Counter({ counter, increment, decrement, index }) {
  const id = React.useId();
  function handleIncrementClick() {
    increment(index);
  }

  function handleDecrementClick() {
    decrement(index);
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

function CounterTools({ counterData, visibleTab, setVisibleTab }) {
  return (
    <CounterSummary
      counterData={counterData}
      visibleTab={visibleTab}
      setVisibleTab={setVisibleTab}
    />
  );
}

function CounterSummary({ counterData, visibleTab, setVisibleTab }) {
  console.log("Rendering counter summary");

  const sortData = [...counterData].sort((a, b) => {
    return b.total - a.total;
  });
  //  this example of useMemo to memoizing the value
  const filterSortedData = React.useMemo(() => {
    console.log("Filtering Data");
    return sortData.filter((counter) => counter.tab === visibleTab);
  }, [visibleTab]);

  const setVisibleTab1 = React.useCallback(() => {
    setVisibleTab(1);
  }, []);

  const setVisibleTab2 = React.useCallback(() => {
    setVisibleTab(2);
  }, []);
  return (
    <section>
      <CounterSummaryHeader
        setVisibleTab1={setVisibleTab1}
        setVisibleTab2={setVisibleTab2}
      />
      {filterSortedData.map((counter, index) => (
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
  console.log("Counter Summary herader");
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
  console.log("Rendering CounterSummaryDetails ===>>");
  return (
    <p>
      {name} ({total})
    </p>
  );
});
