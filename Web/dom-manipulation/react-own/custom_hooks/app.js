const rootNode = document.getElementById("app");
const root = ReactDOM.createRoot(rootNode);
root.render(<App />);

/* objects */
class CounterObj {
  constructor(name) {
    this.name = name;
    this.show = true;
    this.total = 0;
  }
}

const counterData = [
  new CounterObj("A"),
  new CounterObj("B"),
  new CounterObj("C"),
];

/*End  objects */

function App() {
  return (
    <>
      <h1>Counters</h1>
      <section>
        <CounterList />
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

function CounterList() {
  return (
    <section>
      {counterData?.map((counter, index) => (
        <Counter name={counter.name} key={index} />
      ))}
    </section>
  );
}

function Counter(props) {
  const [counterVal, increment] = useCounter();
  useDocumentTitle("Clicks: " + counterVal.total);

  function handleClick() {
    increment();
  }

  return (
    <article key={props.key}>
      <h2>Counter {props.name}</h2>
      <p>You clicked {counterVal.total} times</p>
      <p>
        <button className="button" onClick={handleClick}>
          Click me
        </button>
      </p>
    </article>
  );
}
