const rootNode = document.getElementById("app");
const root = ReactDOM.createRoot(rootNode);

root.render(React.createElement(App));

// console.log(React);

function App() {
  return React.createElement(
    "article",
    null,
    React.createElement("h2", null, "Counter"),
    React.createElement("p", null, "You clicked 1 times"),
    React.createElement("button", null, "click me"),
  );
}

console.log("Plain Javascript Object", App());

// DOM ELement References document.getElementById("app")

// console.log("React Element", React.createElement(App));
//  React Elements -- > (what you want the DOM to look lilke)
//  DOM Elements --> (what the user is experirencing right now)
