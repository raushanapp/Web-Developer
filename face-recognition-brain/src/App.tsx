import React, { Component } from "react";
import "./App.css";
import Navigation from "@/components/Navigation/Navigation";
import Logo from "@/components/logo/Logo";

class App extends Component {
  render(): React.ReactNode {
    return (
      <div className="App">
        <Navigation />
        <Logo />
        {/* <ImageLinkForm/> */}
        {/* <FaceRecognition/> */}
      </div>
    );
  }
}

export default App;
