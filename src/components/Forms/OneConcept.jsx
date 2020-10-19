import React, { Component } from "react";
import apiHandler from "../../api/apiHandler";
import Some from "../../pages/Some/Some";

class OneConcept extends Component {
  state = {
    conceptsList: null,
    concepts: "",
    conceptValue: "",
    someType: "",
    some: "",
  };

  componentDidMount() {
    apiHandler
      .getAll("/api/concepts")
      .then((apiRes) => {
        this.setState({ conceptsList: apiRes.data });
      })
      .catch((apiErr) => {
        console.log(apiErr);
      });
  }

  handleChange = (event) => {
    const value = event.target.value;
    const key = event.target.name;
    const id = event.target.parentNode.id;

    // let concept = "";
    // let conceptValue = "";

    // if (key === "concepts") {
    //   concept = event.target.value;
    //   // conceptValue = event.target.nextSibling.value;
    // } else {
    //   conceptValue = event.target.value;
    //   concept = event.target.previousSibling.value;
    // }

    this.setState(
      {
        [key]: value,
        someType: event.target.value,
      },
      () => this.setSome()
    );

    this.props.handleConcept({
      id: id,
      type: event.target.value,
      // value: conceptValue,
    });
    // this.state.some = <Some someType={this.state.someType} />;
  };

  setSome = (event) => {
    this.setState({ some: <Some someType={this.state.someType} /> });
  };

  removeConcept = (event) => {
    this.props.handleRemove({
      id: event,
    });
  };

  render() {
    // console.log(this.props.concepts[0].value);
    // console.log(this.state.concepts);
    // console.log(this.props.concepts[0].conceptValue);
    // console.log(this.props.concepts[0].type);
    // console.log(this.state.some);

    if (!this.state.conceptsList) {
      return <div>Loading my Concepts...</div>;
    }
    return this.props.concepts.map((concept, i) => {
      return (
        <div key={i} id={i} style={{ display: "flex" }}>
          <select
            id="concepts"
            defaultValue={
              this.props.idEditing === "edit"
                ? this.props.concepts[i].type
                  ? this.props.concepts[i].type
                  : "-1"
                : "-1"
            }
            // defaultValue={this.props.concepts[i].type}
            name="concepts"
            onChange={this.handleChange}
          >
            <option value="-1" disabled>
              ...
            </option>
            {this.state.conceptsList.map((elm) => (
              <option value={elm._id} key={elm._id}>
                {elm.name}
              </option>
            ))}
          </select>
          <div>{this.state.some}</div>
          {/* <Some someType={this.state.someType}/> */}
          {/* <input
            style={{
              visibility:
                this.props.concepts[i].type.length === 0 ? "hidden" : "visible",
            }}
            id="conceptValue"
            value={this.props.concepts[i].value}
            type="text"
            name="conceptValue"
            onChange={this.handleChange}
          /> */}
          {/* <span
            style={{
              visibility:
                this.props.concepts[i].type.length === 0 ? "hidden" : "visible",
            }}
            onClick={() => this.removeConcept(i)}
          >
            Delete
          </span> */}
        </div>
      );
    });
  }
}

export default OneConcept;
