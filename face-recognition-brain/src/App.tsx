import React, { Component } from "react";
import "./App.css";
import Navigation from "@/components/Navigation/Navigation";
import Logo from "@/components/logo/Logo";
import ImageLinkForm from "@/components/ImageLinkForm/ImageLinkForm";
import Rank from "@/components/Rank/Rank";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import type { Engine } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";
import { particlesOptions } from "@/utils/index";
import FaceRecognition from "@/components/FaceRecognition/FaceRecognition";
import SignIn from "@/components/SignIn/SignIn";
import Register from "@/components/Register/Register";

export type Route = "signin" | "register" | "home" | "signout";

type AppState = {
  init: boolean;
  inputUrl: string;
  imageUrl: string;
  route: Route;
  box: object;
  isSignedIn: boolean;
};

class App extends Component<object, AppState> {
  constructor(props: object) {
    super(props);
    this.state = {
      init: false,
      inputUrl: "",
      imageUrl: "",
      route: "signin",
      box: {},
      isSignedIn: false,
    };
  }

  async componentDidMount() {
    await initParticlesEngine(async (engine: Engine) => {
      await loadSlim(engine);
    });

    this.setState({ init: true });
  }

  onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    this.setState({ inputUrl: event.target.value });
  };

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.inputUrl });
    //  we need to work here clarifai packge to
  };

  onSignOut = () => {
    this.setState({ isSignedIn: false, route: "signin" });
  };

  onChangeRoute = (route: Route) => {
    if (route === "signout") {
      this.onSignOut();
    } else if (route === "home") {
      this.setState({ isSignedIn: true, route: "home" });
    } else {
      console.log(route);
      this.setState({ route: route });
    }
  };

  // particlesLoaded = async (container?: Container): Promise<void> => {};

  render(): React.ReactNode {
    const { init, imageUrl, isSignedIn, route } = this.state;
    return (
      <div className="App center">
        {init && (
          <Particles
            className="particles"
            id="tsparticles"
            // particlesLoaded={this.particlesLoaded}
            options={particlesOptions}
          />
        )}
        <Navigation isLoggedIn={isSignedIn} onSignOut={this.onSignOut} />
        {route === "home" ? (
          <>
            <Logo />
            <Rank />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onSubmit={this.onButtonSubmit}
            />
            <FaceRecognition imageUrl={imageUrl} />
          </>
        ) : (
          <>
            {route === "signin" ? (
              <SignIn onChangeRoute={this.onChangeRoute} />
            ) : (
              <Register onChangeRoute={this.onChangeRoute} />
            )}
          </>
        )}
      </div>
    );
  }
}

export default App;
