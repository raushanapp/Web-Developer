import React from "react";
import "@/components/SignIn/sign_in.style.css";
import "@/components/Register/register.style.css";

interface RegisterProps {
  onChangeRoute: (route: string) => void;
}

class Register extends React.Component<RegisterProps> {
  render(): React.ReactNode {
    const { onChangeRoute } = this.props;
    return (
      <div className="Register_container">
        <h3 className="header_title">Register</h3>
        <form action="submit" className="form_container">
          <div className="input_div">
            <label className="email_address" htmlFor="user_name">
              User Name
            </label>
            <input
              type="text"
              id="user_name"
              name="user_name"
              className="input_email"
              placeholder="Enter user name here"
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
            />
          </div>
          <input className="input_btn" type="submit" value="Register" />
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
