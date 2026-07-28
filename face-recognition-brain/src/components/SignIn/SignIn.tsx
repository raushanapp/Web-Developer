import React from "react";
import "@/components/SignIn/sign_in.style.css";
import type { RegisterProps } from "@/components/Register/Register";

type SignInState = {
  email: string;
  password: string;
  isLoading: boolean;
};

class SignIn extends React.Component<RegisterProps, SignInState> {
  constructor(props: RegisterProps) {
    super(props);
    this.state = {
      email: "",
      password: "",
      isLoading: false,
    };
  }

  onEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ email: event.target.value });
  };

  onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ password: event.target.value });
  };

  onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { email, password } = this.state;
    if (!email || !password) {
      return;
    }
    this.setState({ isLoading: true });
    const payload = {
      email,
      password,
    };

    fetch("http://localhost:3000/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => {
        if (
          data.message === "Signin successful" ||
          data?.user.id !== undefined
        ) {
          this.setState({ isLoading: false });
          this.props.loadUser(data?.user);
          this.props.onChangeRoute("home");
        }
      })
      .catch((error) => {
        console.error("Error signing in:", error);
        this.setState({ isLoading: false });
      });
  };

  render(): React.ReactNode {
    const { onChangeRoute } = this.props;
    const { email, password, isLoading } = this.state;
    return (
      <div className="sign_in_container">
        <h3 className="header_title">Sign In</h3>
        <form onSubmit={this.onSubmit} className="form_container">
          <div className="input_div">
            <label className="email_address" htmlFor="user-email-address">
              Email Address
            </label>
            <input
              type="email"
              id="user-email-address"
              name="email"
              value={email}
              onChange={this.onEmailChange}
              className="input_email"
              placeholder="Enter email address here"
            />
          </div>
          <div className="input_div">
            <label className="password" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={this.onPasswordChange}
              className="input_password"
              placeholder="Enter password here"
            />
          </div>
          <input
            className="input_btn"
            type="submit"
            value={isLoading ? "Signing In..." : "Sign In"}
          />
          <p className="bottom_title">
            Don't have an account?{" "}
            <span
              className="pointer_text"
              onClick={() => onChangeRoute("register")}
            >
              Register
            </span>
          </p>
        </form>
      </div>
    );
  }
}

export default SignIn;
