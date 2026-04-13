import React from "react";
// import useCount from "./hooks/useCount";
import "./App.css";
import CardList from "./pages/card-list";
// import ButtonComponent from "./components/button";

class App extends React.Component {
  render(): React.ReactNode {
    // const { count, incrementCount, decrementCount } = useCount();
    // return (
    //   <div>
    //     <div className="app">
    //       <ButtonComponent onClick={incrementCount}>+</ButtonComponent>
    //       <h1>Count A Number : {count}</h1>
    //       <ButtonComponent onClick={decrementCount} disabled={count === 0}>
    //         &minus;
    //       </ButtonComponent>
    //       <h1>Class Components</h1>
    //     </div>
    //   </div>
    // );

    return (
      <div className="app">
        <h1 className="headers">Classes Components</h1>
        <CardList />
      </div>
    );
  }
}

export default App;
