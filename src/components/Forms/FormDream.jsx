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
    date: new Date(),
    concepts: [{ type: "", some: "", feeling: "" }],
    isEditing: this.props.action,
    createVisible: false,
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

  addCreate = (event) => {
    this.setState({ createVisible: true });
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
      <div className="one-dream">
        <form className="form-dream" onSubmit={this.handleSubmit}>
          {/* <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            value={this.state.name}
            name="name"
            onChange={this.handleChange}
          /> */}
          <span
            style={{
              fontSize: "16px",
              color: this.state.feel.length === 0 ? "#FFFFFF" : "#896fac",
            }}
          >
            Hello {this.context.user.name},
          </span>
          <h2
            style={{
              color: this.state.feel.length === 0 ? "#FFFFFF" : "#896fac",
            }}
            className="question"
          >
            How do you feel this morning?
          </h2>
          <select
            id="feel"
            defaultValue="-1"
            name="feel"
            onChange={this.handleChange}
          >
            <option value="-1" disabled>
              ...............................
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
            <option value="Nervous">Nervous</option>
          </select>
          <div
            style={{
              visibility: this.state.feel.length === 0 ? "hidden" : "visible",
            }}
          >
            <h2
              style={{
                color:
                  this.state.concepts[0].type.length === 0
                    ? "#FFFFFF"
                    : "#896fac",
              }}
              className="question"
            >
              What do you remember about your dream?
            </h2>
            {this.state.concepts.map((concept, i) => (
              <div className="about-some" key={i} style={{ display: "flex" }}>
                <p
                  style={{
                    fontSize: "16px",
                    color:
                      this.state.concepts[i].type.length === 0
                        ? "#FFFFFF"
                        : "#ABACAB",
                  }}
                >
                  It was about some
                </p>
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
            <div
              style={{
                visibility:
                  this.state.concepts[0].feeling.length === 0
                    ? "hidden"
                    : "visible",
              }}
            >
              <h2 className="question">Remember something else ?</h2>
              <p>
                <span className="add-some" onClick={() => this.addConcept()}>
                  Mhhhhm yep
                </span>
                <span onClick={() => this.addCreate()}> Nope, that's it</span>
              </p>
              <div
                style={{
                  visibility:
                    this.state.createVisible === false ? "hidden" : "visible",
                }}
              >
                <label htmlFor="name">Let's give this dream a name</label>
                <input
                  id="name"
                  type="text"
                  value={this.state.name}
                  name="name"
                  onChange={this.handleChange}
                />
                <br />
                <button className="btn-dream">{buttonStatus}</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(FormDream);
