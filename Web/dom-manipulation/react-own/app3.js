const rootNode = document.getElementById("app");
const root = ReactDOM.createRoot(rootNode);
root.render(<App />);

function App() {
  const [swapCounter, setSwapCounter] = React.useState(false);

  function handleClickSwap() {
    setSwapCounter(!swapCounter);
  }
  let counterOne = null;
  if (!swapCounter) {
    counterOne = <Counter name="One" />;
  }
  return (
    <>
      <h1>Counter</h1>
      <section>
        {counterOne}
        {swapCounter ? <Counter name="Two" /> : null}
      </section>
      <p>
        <button onClick={handleClickSwap}>Swap Counters</button>
      </p>
    </>
  );
}

function Counter(props) {
  const [numOfClicks, setNumofClicks] = React.useState({ total: 0 });
  React.useEffect(() => {
    console.log("In Use Effect" + "==> " + props.name);
    document.title = "Clicks" + numOfClicks.total;
    return () => {
      console.log("Unmounting " + props.name);
    };
  }, [numOfClicks.total]);

  function handleClick() {
    setNumofClicks({ ...numOfClicks, total: numOfClicks.total + 1 });
  }

  return (
    <article>
      <h1>{props.name}</h1>
      <p>You clicked : {numOfClicks.total} times </p>
      <p>
        <button onClick={handleClick}>Click Me</button>
      </p>
    </article>
  );
}
