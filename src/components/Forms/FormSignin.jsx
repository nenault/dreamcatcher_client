import React, { Component } from "react";

import { UserContext } from "../Auth/UserContext";
import { withRouter } from "react-router-dom";
import apiHandler from "../../api/apiHandler";
import { Link } from "react-router-dom";

class FormSignin extends Component {
  static contextType = UserContext;

  state = {
    email: "",
    password: "",
  };

  handleChange = (event) => {
    const key = event.target.name;

    // You can test more if you have to handle different sorts of inputs.
    const value =
      event.target.type === "file"
        ? event.target.files[0]
        : event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;

    this.setState({ [key]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    apiHandler
      .signin(this.state)
      .then((data) => {
        this.context.setUser(data);
        this.props.history.push("/");
      })
      .catch((error) => {
        console.log(error);
        // Display error message here, if you set the state
      });
  };

  render() {
    return (
      <div className="one-dream">
        <form
          className="form-login"
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
        >
          {/* <label htmlFor="email">Email</label> */}
          <input placeholder="Email" type="email" id="email" name="email" />
          {/* <label htmlFor="password">Password</label> */}
          <input
            placeholder="Password"
            type="password"
            id="password"
            name="password"
          />
          <button className="btn-dream">
            Signin&nbsp;<i className="fas fa-smile"></i>
          </button>
        </form>
        <span
          style={{
            marginTop: "30px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          className="tool"
          to="/signup"
        >
          Don't have an account?
          <Link
            style={{
              color: "#eb10db",
            }}
            className="tool"
            to="/signup"
          >
            Please register
          </Link>
        </span>
      </div>
    );
  }
}

export default withRouter(FormSignin);
