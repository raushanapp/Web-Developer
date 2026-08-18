const rootNode = document.getElementById("app");
const root = ReactDOM.createRoot(rootNode);
root.render(<App />);

function App() {
  return (
    <>
      <h1>Counters</h1>
      <section>
        <Counter name="One" />
        <Counter name="Two" />
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
