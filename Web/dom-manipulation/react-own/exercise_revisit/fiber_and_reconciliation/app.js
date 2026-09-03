const rootNode = document.getElementById("app");
const root = ReactDOM.createRoot(rootNode);

console.log(root);

console.dir(rootNode, "DOM ELEMEnt");
let counterName = "one";
root.render(React.createElement(App));

function App() {
  const counterOne = <CounterOne />;
  const counterTwo = <CounterTwo />;
  return (
    <section>
      <h1>Counters</h1>
      <section>{counterName === "one" ? counterOne : counterTwo}</section>
    </section>
  );
}

function CounterOne() {
  return (
    <article>
      <h2>Counter One</h2>
      <p>You click 1 times </p>
      <button className="button-one">Click one</button>
    </article>
  );
}

function CounterTwo() {
  return (
    <article>
      <h2>Counter Two</h2>
      <p>You click 2 times </p>
      <button className="button-one">Click two</button>
    </article>
  );
}
