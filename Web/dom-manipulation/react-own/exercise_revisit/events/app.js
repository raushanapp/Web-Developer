const rootNode = document.getElementById("app");

rootNode.addEventListener("click", function (event) {
  if (event.target.tagName === "BUTTON") {
    console.log("Clicked button");
  } else {
    console.log("Didn't click button");
  }
});

const root = ReactDOM.createRoot(rootNode);
let counterName = "One";
root.render(<App />);

function App() {
  const counterOne = <CounterOne name={counterName} />;
  const counterTwo = <CounterTwo name={counterName} />;
  return (
    <>
      <h1>Counters</h1>
      <section>{counterName === "One" ? counterOne : counterTwo}</section>
    </>
  );
}

function CounterOne({ name }) {
  const clickHandler = (e) => {
    console.log("React Handled Click");
    console.log(e); // React synatic event
  };

  const parentClickHandler = (e) => {
    console.log("Parent was clicked too");
  };
  const linkClickHandler = (e) => {
    e.preventDefault();
    console.log("going to site");
    e.stopPropagation();
  };

  return (
    <article onClick={parentClickHandler}>
      <h2>Counter {name}</h2>
      <p>You clicked 1 times </p>
      <button className="button" onClick={clickHandler}>
        Click Me
      </button>
      <p>
        <a
          href="http://understandingreact.com"
          target="_blank"
          onClick={linkClickHandler}
        >
          Understanding React
        </a>
      </p>
    </article>
  );
}
function CounterTwo({ name }) {
  return (
    <article>
      <h2>Counter {name}</h2>
      <p>You clicked 1 times </p>
      <button className="button">Click Me</button>
    </article>
  );
}
