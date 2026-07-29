// //  Virtual DOM
// let markup = {
//   type: "article",
//   children: [
//     {
//       type: "h2",
//       children: [
//         {
//           type: "text",
//           value: "Counter",
//         },
//       ],
//     },
//     {
//       type: "h3",
//       children: [
//         {
//           type: "text",
//           value: "This Works",
//         },
//       ],
//     },
//     {
//       type: "p",
//       children: [
//         {
//           type: "text",
//           value: "Counter",
//         },
//         {
//           type: "strong",
//           children: [
//             {
//               type: "em",
//               children: [
//                 {
//                   type: "text",
//                   value: "1",
//                 },
//               ],
//             },
//           ],
//         },
//         {
//           type: "text",
//           value: "times",
//         },
//       ],
//     },
//     {
//       type: "button",
//       children: [
//         {
//           type: "text",
//           value: "Click me",
//         },
//       ],
//     },
//   ],
// };

// console.log(markup);

// const main = document.getElementById("app");

// function addElements(pojoElement, parentDOMNode) {
//   let newDOMNode =
//     pojoElement.type === "text"
//       ? document.createTextNode(pojoElement.value)
//       : document.createElement(pojoElement.type);
//   if (pojoElement.children) {
//     pojoElement.children.forEach((child) => {
//       addElements(child, newDOMNode);
//     });
//   }

//   console.log(parentDOMNode);
//   parentDOMNode.appendChild(newDOMNode);
// }

// addElements(markup, main);

const rootNode = document.getElementById("app");

// console.log("React Object", rootNode);
const root = ReactDOM.createRoot(rootNode);

root.render(React.createElement(App));

// console.log(React);

function App() {
  //   console.log("App component rendered");
  return React.createElement(
    "article",
    null,

    React.createElement("h2", null, "Counter"),
    React.createElement("p", null, "You clicked 1 times"),
    React.createElement("button", null, "Click me"),
  );
}

// console.log(App(), ": <<===");

// console.log(React.createElement(App));

//  before React does  its work
//  and here we are consoling then we get null value because scripts not run this code because this point of time javascripts engine not available to run this code
//  Because javascript code not yet executed

let articleElements = document.getElementsByTagName("article");
let articleElement = document.getElementsByTagName("article").item(0);

// console.log(articleElements);
// console.log(articleElement);

//  after React its work
//  but this example show the difference because engine here available and run this code because setTimeout of browser API
setTimeout(() => {
  let articleElements = document.getElementsByTagName("article");
  let articleElement = document.getElementsByTagName("article").item(0);

  console.log(articleElements);
  console.log(articleElement);
}, 1000);

//  Pure function as  always return the same output for the same input

let counter = { name: "Counter" };

let countValue = 1;

function pureCounter(ctr, value) {
  return `${ctr.name}: ${value}`;
}

function notPureCounter(ctr, value) {
  ctr.name = ctr.name + " Tony!";
  countValue = countValue + 1;
  return `${ctr.name}: ${value}`;
}

console.log(pureCounter(counter, countValue));
console.log(pureCounter(counter, countValue + 1));
console.log(pureCounter(counter, countValue));

console.log(notPureCounter(counter, countValue));
console.log(notPureCounter(counter, countValue + 1));
console.log(counter);
