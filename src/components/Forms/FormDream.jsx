import React, { Component } from "react";
import apiHandler from "../../api/apiHandler";
import { withRouter } from "react-router-dom";

class FormDream extends Component {
  state = {
    name: "",
  };

  componentDidMount() {
    if (this.props.action === "edit") {
      apiHandler
        .getOne("/api/dreams/", this.props.id)
        .then((apiRes) => {
          const dream = apiRes.data;
          this.setState({
            name: dream.name,
          });
        })
        .catch((apiErr) => {
          console.log(apiErr);
        });
    }
  }

  createDream = () => {
    const fd = new FormData();

    for (let key in this.state) {
      fd.append(key, this.state[key]);
    }

    apiHandler
      .createOne("/api/dreams", fd)
      .then((apiRes) => {
        this.props.history.push("/dreams");
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
      .updateOne("/api/dreams/" + this.props.id, fd)
      .then((apiRes) => {
        this.props.history.push("/dreams");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    if (this.props.action === "edit") {
      this.updateDream();
    } else {
      this.createDream();
    }
  };

  handleChange = (event) => {
    const name = event.target.name;
    const value =
      event.target.type === "file" ? event.target.files[0] : event.target.value;

    this.setState({ [name]: value });
  };

  render() {
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
        
        <button>Create</button>
      </form>
    );
  }
}

export default withRouter(FormDream);
