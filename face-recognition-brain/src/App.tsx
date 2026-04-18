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

type AppState = {
  init: boolean;
};

class App extends Component<object, AppState> {
  constructor(props: object) {
    super(props);
    this.state = {
      init: false,
    };
  }

  async componentDidMount() {
    await initParticlesEngine(async (engine: Engine) => {
      await loadSlim(engine);
    });

    this.setState({ init: true });
  }

  // particlesLoaded = async (container?: Container): Promise<void> => {};

  render(): React.ReactNode {
    const { init } = this.state;
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
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm />
        {/* <FaceRecognition/> */}
      </div>
    );
  }
}

export default App;
