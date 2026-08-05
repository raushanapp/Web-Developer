const rootNode = document.getElementById("app");
const root = ReactDOM.createRoot(rootNode);
const counterName = "One";
root.render(React.createElement(App));

function App() {
  const counterOne = <Counter name={counterName} />;
  const counterTwo = <Counter2 name={counterName} />;
  return (
    <>
      <h1>Counters</h1>
      {counterName === "One" ? counterOne : counterTwo}
    </>
  );
}

function Counter({ name }) {
  return (
    <article>
      <h2>Counter {name} </h2>
      <p>You clicked 1 time</p>
      <button className="button">Click me</button>
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
