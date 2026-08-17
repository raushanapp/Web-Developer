const rootNode = document.getElementById("app");
const root = ReactDOM.createRoot(rootNode);
root.render(<App />);

function App() {
  const ref = React.useRef();
  React.useEffect(() => {
    ref.current.focus();
  }, []);
  return (
    <>
      <h1>Understanding useRef</h1>
      <section>
        <p>Counter</p>
        <Counter name="One" />
        <Counter name="Two" ref={ref} />
      </section>
    </>
  );
}

const Counter = React.forwardRef(function Counter(props, buttonRef) {
  //   const numOfClicksRef = React.useRef({ total: 0 });

  //   function handleClick() {
  //     numOfClicksRef.current.total = numOfClicksRef.current.total + 1;
  //     alert(`You've clicked ${numOfClicksRef.current.total}`);
  //   }
  const [numOfClicks, setNumOfClicks] = React.useState({ total: 0 });
  //   const buttonRef = React.useRef();

  //   React.useEffect(() => {
  //     buttonRef.current.focus();
  //   }, []);

  function handleClick() {
    setNumOfClicks({ ...numOfClicks, total: numOfClicks.total + 1 });
  }

  return (
    <article>
      <h2>Counter {props.name}</h2>
      <p>You clicks {numOfClicks.total} times</p>
      <p>
        <button className="button" onClick={handleClick} ref={buttonRef}>
          Click me
        </button>
      </p>
    </article>
  );
});
