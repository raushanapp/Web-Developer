import React from "react";
import "@/components/SignIn/sign_in.style.css";

class SignIn extends React.Component {
  render(): React.ReactNode {
    return (
      <div className="sign_in_container">
        <h3 className="header_title">Sign In</h3>
        <form action="submit" className="form_container">
          <div className="input_div">
            <label className="email_address" htmlFor="email-address">
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
          <input className="input_btn" type="submit" value="Sign In" />
        </form>
      </div>
    );
  }
}

export default SignIn;
