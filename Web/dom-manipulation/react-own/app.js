const rootNode = document.getElementById("app");
const root = ReactDOM.createRoot(rootNode);
let counterName = "One";
root.render(React.createElement(App));

function App() {
  return React.createElement(
    "section",
    null,
    React.createElement("h1", null, "Counters"),
    React.createElement(
      "section",
      null,
      // counterName === "One"
      //   ? React.createElement(Counter, { name: counterName })
      //   : React.createElement(Counter2, { name: counterName }),
      React.createElement(Counter, null),
    ),
  );
}

// function Counter({ name }) {
function Counter() {
  //  here you can not modify props directly
  // props.name = "Three";
  return React.createElement(
    "article",
    null,
    React.createElement("h2", null, "Counter"),
    React.createElement("p", null, "You clicked 1 times"),
    React.createElement("button", { className: "button" }, "Click me"),
  );
}

//  Template Logic

// function Counter2({ name }) {
//  you can modify local variables if you are not using the props directly
// name = "Three";

// return React.createElement(
//   "article",
//   null,
//   React.createElement("h2", null, "Counter", " ", name),
//   React.createElement("p", null, "You clicked 1 times"),
//   React.createElement("button", null, "Click me"),
// );
// }

// function rerender() {
//   console.log("Rerender...");
//   counterName = "Two";
//   root.render(React.createElement(App));
// }

// rootNode.className = "root";  this doing imperative way because i am modifying the DOM directly
