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

export interface UserProps {
  id: string;
  name: string;
  email: string;
  entries: number;
  joined: string;
}

type AppState = {
  init: boolean;
  inputUrl: string;
  imageUrl: string;
  route: Route;
  box: object;
  isSignedIn: boolean;
  user: UserProps;
};

const intitalState: AppState = {
  init: false,
  inputUrl: "",
  imageUrl: "",
  route: "signin",
  box: {},
  isSignedIn: false,
  user: {
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: "",
  },
};

class App extends Component<object, AppState> {
  constructor(props: object) {
    super(props);
    this.state = intitalState;
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
    fetch("http://localhost:3000/imageurl", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        input: this.state.inputUrl,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("DATA", data);
        if (data) {
          fetch("http://localhost:3000/image", {
            method: "put",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: this.state.user.id,
            }),
          })
            .then((response) => response.json())
            .then((count) => {
              this.setState({ user: { ...this.state.user, entries: count } });
            });
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  onSignOut = () => {
    this.setState({ isSignedIn: false, route: "signin" });
  };

  onLoadUser = (user: UserProps) => {
    console.log(user);
    this.setState({ user: user });
  };

  onChangeRoute = (route: Route) => {
    if (route === "signout") {
      this.onSignOut();
      this.setState(intitalState);
    } else if (route === "home") {
      this.setState({ isSignedIn: true, route: "home" });
    } else {
      console.log(route);
      this.setState({ route: route });
    }
  };

  // particlesLoaded = async (container?: Container): Promise<void> => {};

  render(): React.ReactNode {
    const { init, imageUrl, isSignedIn, route, user } = this.state;
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
            <Rank name={user.name} rank={user.entries} />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onSubmit={this.onButtonSubmit}
            />
            <FaceRecognition imageUrl={imageUrl} />
          </>
        ) : (
          <>
            {route === "signin" ? (
              <SignIn
                loadUser={this.onLoadUser}
                onChangeRoute={this.onChangeRoute}
              />
            ) : (
              <Register
                loadUser={this.onLoadUser}
                onChangeRoute={this.onChangeRoute}
              />
            )}
          </>
        )}
      </div>
    );
  }
}

export default App;
