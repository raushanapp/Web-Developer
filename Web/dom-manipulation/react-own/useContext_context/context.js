const rootNode = document.getElementById("app");
const root = ReactDOM.createRoot(rootNode);
root.render(<App />);

/* objects */
class CounterObj {
  constructor(name, show, total) {
    this.name = name;
    this.show = show;
    this.total = total;
  }
}

/*End  objects */

const CounterContext = React.createContext();

function App() {
  const [counterData, setCounterData] = React.useState([
    new CounterObj("A", true, 0),
    new CounterObj("B", false, 0),
    new CounterObj("C", true, 0),
  ]);

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

  const contextData = [counterData, increment, decrement];

  return (
    <>
      <CounterContext.Provider value={contextData}>
        <h1>Counters</h1>
        <section>
          <CounterList />
          <CounterTools />
        </section>
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
  const [contextData] = React.useContext(CounterContext);
  useDocumentTitle(
    "Clicks : " +
      contextData
        ?.map((counter) => {
          return counter.total;
        })
        .join(","),
  );

  return (
    <section>
      {contextData?.map((counter, index) => (
        <Counter key={index} counter={counter} index={index} />
      ))}
    </section>
  );
}

function Counter({ counter, index }) {
  const [_, increment, decrement] = React.useContext(CounterContext);
  function handleIncrementClick() {
    increment(index);
  }

  function handleDecrementClick() {
    decrement(index);
  }

  return (
    <dl className="counter">
      <dt>Counter {counter.name}</dt>
      <dd className="counter_value">
        {counter.total > 0 ? (
          <button className="button" onClick={handleDecrementClick}>
            -
          </button>
        ) : (
          <div className="counter_emptu"></div>
        )}

        {counter.total}

        <button className="button" onClick={handleIncrementClick}>
          +
        </button>
      </dd>
    </dl>
  );
}

//  creating another context here
//  Here overriding the parent context data and passing current context data below the tree

function CounterTools() {
  const [counterData, setCounterData] = React.useState([
    new CounterObj("A", true, 3),
    new CounterObj("B", true, 3),
    new CounterObj("C", false, 3),
  ]);

  const contextData = [counterData, null, null];

  return (
    <CounterContext.Provider value={contextData}>
      <CounterSummary />
    </CounterContext.Provider>
  );
}

function CounterSummary() {
  const [contextData] = React.useContext(CounterContext);
  const sortData = [...contextData].sort((a, b) => {
    return b.total - a.total;
  });

  const summary = sortData
    .filter((counter) => counter.show)
    .map((counter) => {
      return counter.name + "(" + counter.total + ")";
    })
    .join(",");
  return <p>Summary : {summary}</p>;
}
