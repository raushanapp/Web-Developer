const rootNode = document.getElementById("app");
const root = ReactDOM.createRoot(rootNode);

console.log("===>>>", root);
const counterName = "One";
// root.render(React.createElement(App));
root.render(<App />);

function App() {
  const counterOne = <Counter name={counterName} />;
  const counterTwo = <Counter2 name={counterName} />;
  return (
    <>
      <h1>Counters</h1>
      <section>{counterName === "One" ? counterOne : counterTwo}</section>
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

//  Rerender React

function rerender() {
  console.log("Rerendering...");
  counterName = "Two";
  root.render(<App />);
}

//  Linked list

class LinkedListNode {
  constructor(val, next = null) {
    this.value = val;
    this.next = next;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  append(val) {
    const newNode = new LinkedListNode(val);
    //  if there is no head yet let's make new nodee a head.
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
      return this;
    }
    //  Attach new node to the end of linked list.
    this.tail.next = newNode;
    this.tail = newNode;
    return this;
  }

  print() {
    let currentNode = this.head;
    while (currentNode) {
      console.log(currentNode.value);
      currentNode = currentNode.next;
    }
  }
}

let myLinkedList = new LinkedList();
myLinkedList.append("Tony");
myLinkedList.append("Mayur");
myLinkedList.append("Alice");
myLinkedList.append("Understanding React");
myLinkedList.print();
