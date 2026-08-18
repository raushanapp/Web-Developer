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

  return (
    <>
      <h1>Counters</h1>
      <section>
        <CounterList
          counterData={counterData}
          increment={increment}
          decrement={decrement}
        />
        <CounterTools>
          <CounterSummary counterData={counterData} />
        </CounterTools>
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

function useCounter() {
  const [counterVal, setCounterVal] = React.useState({ total: 0 });
  const increment = () => {
    setCounterVal({ ...counterVal, total: counterVal.total + 1 });
  };
  return [counterVal, increment];
}

// CounterList

function CounterList({ counterData, increment, decrement }) {
  const update = useDocumentTitle(
    "Clicks : " +
      counterData
        .map((counter) => {
          return counter.total;
        })
        .join(","),
  );
  console.log(update);
  return (
    <section>
      {counterData?.map((counter, index) => (
        <Counter
          key={index}
          counter={counter}
          index={index}
          increment={increment}
          decrement={decrement}
        />
      ))}
    </section>
  );
}

function Counter({ counter, increment, decrement, index }) {
  function handleIncrementClick() {
    increment(index);
    console.log(counter);
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

function CounterTools({ children }) {
  return <>{children}</>;
}

function CounterSummary({ counterData }) {
  const sortData = [...counterData].sort((a, b) => {
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
