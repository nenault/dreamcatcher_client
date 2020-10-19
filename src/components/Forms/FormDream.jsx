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
    feel: "",
    concepts: [{ type: "", some: "", feeling: "" }],
    isEditing: this.props.action,
  };

  componentDidMount() {
    if (this.props.action === "edit") {
      // this.state.isEditing = true;
      apiHandler
        .getOne("/api/dreams/", this.props.id)
        .then((apiRes) => {
          const dream = apiRes.data;
          this.setState({
            name: dream.name,
            concepts: dream.concepts,
            user: dream.user,
            // isEditing: true,
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
    apiHandler
      .updateOne("/api/dreams/" + this.props.id, this.state)
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

  removeConcept = (concept) => {
    const copyConcepts = [...this.state.concepts];

    //console.log(copyConcepts[concept.id]);

    copyConcepts.splice(concept.id, 1);

    this.setState({ concepts: copyConcepts });
  };

  addConcept = (event) => {
    this.setState((prevState) => ({
      concepts: [...prevState.concepts, { type: "", some: "", feeling: "" }],
    }));
  };

  render() {
    // console.log(this.state.concepts);
    // let { concepts } = this.state;
    const buttonStatus = this.state.isEditing === "edit" ? "Edit" : "Create";
    return (
      <div>
        <form className="Form" onSubmit={this.handleSubmit}>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            value={this.state.name}
            name="name"
            onChange={this.handleChange}
          />
          <h2>How do you feel?</h2>
          <select
            id="feel"
            defaultValue="-1"
            name="feel"
            onChange={this.handleChange}
          >
            <option value="-1" disabled>
              ...
            </option>
            <option value="Excited">Excited</option>
            <option value="Happy">Happy</option>
            <option value="Contented">Contented</option>
            <option value="Calm">Calm</option>
            <option value="Bored">Bored</option>
            <option value="Sad">Sad</option>
            <option value="Scared">Scared</option>
            <option value="Angry">Angry</option>
            <option value="Upset">Upset</option>
            <option value="Nervous">Nervous </option>
          </select>
          <h2>What do you remember?</h2>
          {this.state.concepts.map((concept, i) => (
            <div key={i} style={{ display: "flex" }}>
              About some
              <OneConcept
                handleConcept={this.getConcept}
                sendValue={this.getConcept}
                handleRemove={this.removeConcept}
                concepts={this.state.concepts}
                idEditing={this.state.isEditing}
                id={i}
              />
            </div>
          ))}

          {/* <OneConcept id="1" handleConcept={this.addConcept} /> */}
          <p onClick={() => this.addConcept()}>Something else ?</p>
          <button>{buttonStatus}</button>
        </form>
      </div>
    );
  }
}

export default withRouter(FormDream);
