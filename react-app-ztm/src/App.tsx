import React from "react";
import "./App.css";
import CardList from "./pages/card-list";
import SearchBox from "./components/search-box";
import { robots } from "./data";

class App extends React.Component<
  object,
  { robots: typeof robots; searchField: string }
> {
  constructor(props: object) {
    super(props);
    this.state = {
      robots: robots,
      searchField: "",
    };
  }

  onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchField: e.target.value });
  };

  render() {
    const filteredRobots = this.state.robots.filter((robots) => {
      return robots.name
        .toLowerCase()
        .includes(this.state.searchField.toLowerCase());
    });

    return (
      <div className="app">
        <h1 className="headers">RoboFriends</h1>
        <SearchBox searchChange={this.onSearchChange} />
        <CardList robos={filteredRobots} />
      </div>
    );
  }
}

export default App;
