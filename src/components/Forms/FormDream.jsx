import React, { Component } from "react";
import apiHandler from "../../api/apiHandler";
import { withRouter } from "react-router-dom";
import { UserContext } from "../Auth/UserContext";
import OneConcept from "./OneConcept";

class FormDream extends Component {
  static contextType = UserContext;

  state = {
    name: "",
    user: "",
    concepts: [{ type: "", value: "" }],
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
    apiHandler
      .createOne("/api/dreams", this.state)
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

    this.setState({ [name]: value, user: this.context.user._id });
  };

  getConcept = (concept) => {
    const copyConcepts = [...this.state.concepts];

    let { id, ...rest } = concept;
    copyConcepts.splice(id, 1, rest);

    this.setState({ concepts: copyConcepts });
  };

  addConcept = (event) => {
    this.setState((prevState) => ({
      concepts: [...prevState.concepts, { type: "", value: "" }],
    }));
  };

  render() {
    //console.log(this.state.concepts);
    let { concepts } = this.state;
    const buttonStatus = this.props.action === "edit" ? "Edit" : "Create";
    return (
      <form className="Form" onSubmit={this.handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          value={this.state.name}
          name="name"
          onChange={this.handleChange}
        />
        <OneConcept id="0" handleConcept={this.getConcept} concepts={concepts}  />
        {/* <OneConcept id="1" handleConcept={this.addConcept} /> */}
        <p onClick={() => this.addConcept()}>Something else ?</p>
        <button>{buttonStatus}</button>
      </form>
    );
  }
}

export default withRouter(FormDream);
