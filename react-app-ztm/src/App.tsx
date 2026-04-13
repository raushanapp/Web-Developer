import useCount from "./hooks/useCount";
import "./App.css";
import ButtonComponent from "./components/button";

function App() {
  const { count, incrementCount, decrementCount } = useCount();

  return (
    <div>
      <h1>React Hooks</h1>
      <div className="app">
        <ButtonComponent onClick={incrementCount}>+</ButtonComponent>
        <h1>Count A Number : {count}</h1>
        <ButtonComponent onClick={decrementCount} disabled={count === 0}>
          &minus;
        </ButtonComponent>
      </div>
    </div>
  );
}

export default App;
