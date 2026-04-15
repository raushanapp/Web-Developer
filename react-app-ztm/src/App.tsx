import React from "react";
import "./App.css";
import CardList from "./pages/card-list";
import SearchBox from "./components/search-box";
import { robots } from "./data";
import Scroll from "./components/scroll";

class App extends React.Component<
  object,
  { robots: typeof robots; searchField: string }
> {
  constructor(props: object) {
    super(props);
    this.state = {
      robots: [],
      searchField: "",
    };

    // console.log("constructor 1"); this run first
  }

  componentDidMount(): void {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((user) => this.setState({ robots: user }));
    // console.log("componentDidMount 2"); this run third and repaint the items then runs again render
  }

  onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchField: e.target.value });
  };

  render() {
    const { searchField, robots } = this.state;

    const filteredRobots = robots.filter((robot) => {
      return robot.name.toLowerCase().includes(searchField.toLowerCase());
    });

    // console.log("Render 3");  this run second

    return !robots.length ? (
      <h1>Loading...</h1>
    ) : (
      <div className="app">
        <h1 className="headers">RoboFriends</h1>
        <SearchBox searchChange={this.onSearchChange} />
        <Scroll>
          <CardList robos={filteredRobots} />
        </Scroll>
      </div>
    );
  }
}

export default App;
