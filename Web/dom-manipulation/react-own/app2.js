const rootNode = document.getElementById("app");
const root = ReactDOM.createRoot(rootNode);
root.render(<App />);

function App() {
  return (
    <>
      <section>
        <h1>Use Reducer</h1>
        <Counter name="First Counter" />
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

  return (
    <article>
      <h2>Counter {props.name}</h2>
      <p>You clicked {numOfClicks} times</p>
      <button
        className="btn btn-primary"
        onClick={() => {
          //   dispatch({ type: "Increment" });
          setNumOfClicks(numOfClicks + 1);
        }}
      >
        Click me
      </button>
    </article>
  );
}
