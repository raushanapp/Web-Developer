const rootNode = document.getElementById("app");
const root = ReactDOM.createRoot(rootNode);
root.render(React.createElement(App));

function App() {
  const [swapCounter, setSwapCounter] = React.useState(false);
  function handleClick() {
    setSwapCounter(!swapCounter);
  }
  let counterOne = null;

  if (!swapCounter) {
    counterOne = <Counter name="One" />;
  }
  return (
    <section>
      <h1>Counters</h1>
      {counterOne}
      <section>{swapCounter ? <Counter name="Two" /> : null}</section>
      <p>
        <button className="button-one" onClick={handleClick}>
          Swap Counters
        </button>
      </p>
    </section>
  );
}

function Counter(props) {
  const [numOfClicks, setNumOfClicks] = React.useState({ total: 0 });

  React.useEffect(() => {
    console.log("In Use Effect ===> ", props.name);
    document.title = "Clicks : " + numOfClicks.total;
    return () => {
      console.log("Unmounting---->>> ", props.name);
    };
  }, [numOfClicks.total]);

  function handleClick() {
    setNumOfClicks({ ...numOfClicks, total: numOfClicks.total + 1 });
  }
  return (
    <article>
      <h2>Counter {props.name}</h2>
      <p>You click {numOfClicks.total}times </p>
      <button className="button-one" onClick={handleClick}>
        Click me
      </button>
    </article>
  );
}
