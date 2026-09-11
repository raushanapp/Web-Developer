import React from "react";
import "./App.css";
import CardList from "./pages/card-list";
import SearchBox from "./components/search-box";
import { robots } from "./data";
import Scroll from "./components/scroll";
import { connect, type ConnectedProps } from "react-redux";
import { setSearchField } from "./store/actions";
import type { RootState } from "./store/store";

const mapStateToProps = (state: RootState) => {
  return { searchField: state.roboSearch.search };
};

const mapDispatchProps = {
  setSearchField,
};

const connector = connect(mapStateToProps, mapDispatchProps);

type PropsFormRedux = ConnectedProps<typeof connector>;

class App extends React.Component<PropsFormRedux, { robots: typeof robots }> {
  constructor(props: PropsFormRedux) {
    super(props);
    this.state = {
      robots: [],
    };
  }

  componentDidMount(): void {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((user) => this.setState({ robots: user }));
    // console.log("componentDidMount 2"); this run third and repaint the items then runs again render
  }

  onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.props.setSearchField(e.target.value);
  };

  render() {
    const { robots } = this.state;
    const { searchField } = this.props;

    const filteredRobots = robots.filter((robot) => {
      return robot.name.toLowerCase().includes(searchField.toLowerCase());
    });

    return !robots.length ? (
      <h1>Loading...</h1>
    ) : (
      <section className="app">
        <header className="headers">
          <h1>RoboFriends</h1>
        </header>
        <SearchBox searchChange={this.onSearchChange} />
        <Scroll>
          <CardList robos={filteredRobots} />
        </Scroll>
      </section>
    );
  }
}

export default connector(App);
