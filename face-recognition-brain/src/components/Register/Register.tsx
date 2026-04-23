import React from "react";
import "@/components/SignIn/sign_in.style.css";
import "@/components/Register/register.style.css";
import type { Route, UserProps } from "@/App";

interface RegisterProps {
  onChangeRoute: (route: Route) => void;
  loadUser: (user: UserProps) => void;
}

type RegisterState = {
  user_name: string;
  email: string;
  password: string;
  isLoading: boolean;
};

class Register extends React.Component<RegisterProps, RegisterState> {
  constructor(props: RegisterProps) {
    super(props);
    this.state = {
      user_name: "",
      email: "",
      password: "",
      isLoading: false,
    };
  }

  onChangeUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ user_name: e.target.value });
  };
  onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ email: e.target.value });
  };
  onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ password: e.target.value });
  };
  onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    this.setState({ isLoading: true });
    // Handle form submission logic here
    fetch("http://localhost:3000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state),
    })
      .then((response) => response.json())
      .then((user) => {
        if (user.message === "User registered successfully") {
          this.setState({ isLoading: false });
          this.props.loadUser(user.users);
          this.props.onChangeRoute("home");
        }
      });
  };

  render(): React.ReactNode {
    const { onChangeRoute } = this.props;
    const { user_name, email, password, isLoading } = this.state;
    return (
      <div className="Register_container">
        <h3 className="header_title">Register</h3>
        <form
          onSubmit={this.onSubmit}
          action="submit"
          className="form_container"
        >
          <div className="input_div">
            <label className="email_address" htmlFor="name">
              User Name
            </label>
            <input
              type="text"
              id="user_name"
              name="user_name"
              className="input_email"
              placeholder="Enter user name here"
              value={user_name}
              onChange={this.onChangeUserName}
            />
          </div>
          <div className="input_div">
            <label className="email_address" htmlFor="useremail-address">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="input_email"
              placeholder="Enter email address here"
              value={email}
              onChange={this.onChangeEmail}
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
              className="input_password"
              placeholder="Enter password here"
              value={password}
              onChange={this.onChangePassword}
            />
          </div>
          <input
            className="input_btn"
            type="submit"
            value={isLoading ? "Registering..." : "Register"}
            disabled={isLoading}
          />
          <p className="bottom_title">
            Don't have an account?{" "}
            <span
              className="pointer_text"
              onClick={() => onChangeRoute("signin")}
            >
              Sign In
            </span>
          </p>
        </form>
      </div>
    );
  }
}

export default Register;
