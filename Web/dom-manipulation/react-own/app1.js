const rootNode = document.getElementById("app");
const root = ReactDOM.createRoot(rootNode);
// console.log("===>>>", root);
let counterName = "One";
// root.render(React.createElement(App));
root.render(<App />);

function App() {
  const counterOne = <Counter name={counterName} />;
  const counterTwo = <Counter2 name={counterName} />;
  return (
    <>
      <h1>Counters</h1>
      <section>{counterName === "One" ? counterOne : counterTwo}</section>
      <button onClick={rerender}>Rerender</button>
    </>
  );
}

function Counter({ name }) {
  const clickHandler = (event) => {
    console.log("React handled click ");
    console.log(event);
  };

  const parentClickHandler = (event) => {
    console.log("Parent was clicked too");
  };

  const linkClickHandler = (event) => {
    event.preventDefault();
    console.log("Going to site");
    event.stopPropagation();
  };

  return (
    <article onClick={parentClickHandler}>
      <h2>Counter {name} </h2>
      <p>You clicked 1 time</p>
      <button className="button" onClick={clickHandler}>
        Click me
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

function Counter2({ name }) {
  return (
    <article>
      <h2>Counter {name} </h2>
      <p>You clicked 1 time</p>
      <button className="button">Click me</button>
    </article>
  );
}
//  Rerender React
function rerender() {
  console.log("Rerendering...");
  counterName = "Two";
  root.render(<App />);
}
