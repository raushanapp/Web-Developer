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

type AppState = {
  init: boolean;
  inputUrl: string;
  imageUrl: string;
};

class App extends Component<object, AppState> {
  constructor(props: object) {
    super(props);
    this.state = {
      init: false,
      inputUrl: "",
      imageUrl: "",
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

  // particlesLoaded = async (container?: Container): Promise<void> => {};

  render(): React.ReactNode {
    const { init, inputUrl, imageUrl } = this.state;
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
        <ImageLinkForm
          onInputChange={this.onInputChange}
          onSubmit={this.onButtonSubmit}
        />
        <FaceRecognition imageUrl={imageUrl} />
      </div>
    );
  }
}

export default App;
