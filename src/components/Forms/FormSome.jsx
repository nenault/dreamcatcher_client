import React, { Component } from "react";
import apiHandler from "../../api/apiHandler";
import { withRouter } from "react-router-dom";
import { UserContext } from "../Auth/UserContext";

class FormSome extends Component {
  static contextType = UserContext;

  state = {
    value: "",
    user: "",
    concept: "",
  };

  createSome = () => {
    apiHandler
      .createOne("/api/some", this.state)
      .then((apiRes) => {
        this.props.handleSome(apiRes.data);
        // this.props.history.push("/concepts");
      })
      .catch((apiError) => {
        console.log(apiError);
      });

    this.setState({ value: "" });
  };

  updateSome = () => {
    apiHandler
      .updateOne("/api/some/" + this.props.id, this.state)
      .then((apiRes) => {
        //    this.props.history.push("/concepts");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  addSome = (event) => {
    if (this.props.action === "edit") {
      this.updateSome();
    } else {
      this.createSome();
    }
  };

  handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value,
      user: this.context.user._id,
      concept: this.props.concept,
    });
  };

  render() {
    // const buttonStatus = this.props.action === "edit" ? "Edit" : "Create";
    return (
      <div style={{ display: "flex" }}>
        <input
          id="value"
          type="text"
          value={this.state.value}
          name="value"
          onChange={this.handleChange}
        />
        <p className="who" onClick={() => this.addSome()}> hop</p>
      </div>
    );
  }
}

export default withRouter(FormSome);
