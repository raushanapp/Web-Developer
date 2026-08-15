const rootNode = document.getElementById("app");
const root = ReactDOM.createRoot(rootNode);
root.render(<App />);

function App() {
  return (
    <>
      <section>
        <h1>Use Reducer</h1>
        <Counter name="First Counter" />
        <Counter name="Second Counter" />
      </section>
    </>
  );
}

function Counter(props) {
  const [state, dispatch] = React.useReducer(
    (state, action) => {
      switch (action.type) {
        case "Increment": {
          return { click: state.click + 1 };
        }
        default:
          throw new Error();
      }
    },
    { click: 0 },
  );

  const [numOfClicks, setNumOfClicks] = React.useState(0);
  const [myName, setMyName] = React.useState("Tony");
  //  this calling useState will be called on every render, so the value of myName will always be "Tony" on every render. The setMyName function will not be called, so the value of myName will never change. This is because the useState hook is called with the initial value of "Tony" on every render, and the setMyName function is never called to update the state.
  //   let test = "";
  //   let settest = null;
  //   if (numOfClicks < 2) {
  //     [test, settest] = React.useState("Tony 1");
  //   }
  const [myAge, dispatchMyAge] = React.useReducer(() => {}, { age: 30 });

  // handle wrong click handler, this will not work as expected because the state is not updated immediately, so the value of numOfClicks will always be 0 when the function is called. The setNumOfClicks function is called three times, but the state is not updated until the next render, so the value of numOfClicks will always be 0 when the function is called.
  function handleWrongClick() {
    setNumOfClicks(numOfClicks + 1);
    setNumOfClicks(numOfClicks + 1);
    setNumOfClicks(numOfClicks + 1);
  }
  // handle correct click handler, this will work as expected because the state is updated immediately, so the value of numOfClicks will be 3 when the function is called. The setNumOfClicks function is called three times, and the state is updated immediately, so the value of numOfClicks will be 3 when the function is called.
  function handleClick() {
    setNumOfClicks((prevNumOfClicks) => prevNumOfClicks + 1);
    setNumOfClicks((prevNumOfClicks) => prevNumOfClicks + 1);
    setNumOfClicks((prevNumOfClicks) => prevNumOfClicks + 1);
  }

  return (
    <article>
      <h2>Counter {props.name}</h2>
      <p>You clicked {numOfClicks} times</p>
      <button
        className="btn btn-primary"
        onClick={
          //   () => {
          //   dispatch({ type: "Increment" });
          //   setNumOfClicks(numOfClicks + 1);
          //   }
          handleClick
        }
      >
        Click me
      </button>
    </article>
  );
}
