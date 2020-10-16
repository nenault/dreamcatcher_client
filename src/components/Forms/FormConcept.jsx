import React, { Component } from "react";
import apiHandler from "../../api/apiHandler";
import { withRouter } from "react-router-dom";

class FormConcept extends Component {
  state = {
    name: "",
    image:"",
  };

  componentDidMount() {
    if (this.props.action === "edit") {
      apiHandler
        .getOne("/api/concepts/", this.props.id)
        .then((apiRes) => {
          const concept = apiRes.data;
          this.setState({
            name: concept.name,
          });
        })
        .catch((apiErr) => {
          console.log(apiErr);
        });
    }
  }

  createConcept = () => {
    const fd = new FormData();

    for (let key in this.state) {
      fd.append(key, this.state[key]);
    }

    apiHandler
      .createOne("/api/concepts", fd)
      .then((apiRes) => {
        this.props.history.push("/concepts");
      })
      .catch((apiError) => {
        console.log(apiError);
      });
  };

  updateDream = () => {
    const fd = new FormData();

    for (let key in this.state) {
      fd.append(key, this.state[key]);
    }

    apiHandler
      .updateOne("/api/concepts/" + this.props.id, fd)
      .then((apiRes) => {
        this.props.history.push("/concepts");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    if (this.props.action === "edit") {
      this.updateConcept();
    } else {
      this.createConcept();
    }
  };

  handleChange = (event) => {
    const name = event.target.name;
    const value =
      event.target.type === "file" ? event.target.files[0] : event.target.value;

    this.setState({ [name]: value });
  };

  render() {
    const buttonStatus = this.props.action === "edit" ? "Edit" : "Create";
    return (
      <form className="Form" onSubmit={this.handleSubmit}>
        {/* <pre>{JSON.stringify(this.props, null, 2)}</pre> */}
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          value={this.state.name}
          name="name"
          onChange={this.handleChange}
        />

        <label htmlFor="image">Image</label>
        <input
          type="file"
          name="image"
          id="image"
          onChange={this.handleChange}
        />
        <button>{buttonStatus}</button>
      </form>
    );
  }
}

export default withRouter(FormConcept);
