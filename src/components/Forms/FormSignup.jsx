import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { UserContext } from "../Auth/UserContext";
import apiHandler from "../../api/apiHandler";

class FormSignup extends Component {
  static contextType = UserContext;

  state = {
    name: "",
    email: "",
    password: "",
  };

  handleChange = (event) => {
    const value =
      event.target.type === "file"
        ? event.target.files[0]
        : event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;

    const key = event.target.name;

    this.setState({ [key]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    apiHandler
      .signup(this.state)
      .then((data) => {
        this.context.setUser(data);
        this.props.history.push("/");
      })
      .catch((error) => {
        console.log(error);
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
          {/* <label htmlFor="name">Name</label> */}
          <input placeholder="Name" type="name" id="name" name="name" />
          {/* <label htmlFor="email">Email</label> */}
          <input placeholder="Email" type="email" id="email" name="email" />
          {/* <label htmlFor="password">Password</label> */}
          <input placeholder="Password" type="password" id="password" name="password" />
          <button className="btn-dream">
            Signup&nbsp;<i class="fas fa-smile"></i>
          </button>
        </form>
      </div>
    );
  }
}

export default withRouter(FormSignup);
