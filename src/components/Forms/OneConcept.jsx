import React, { Component } from "react";
import apiHandler from "../../api/apiHandler";

class OneConcept extends Component {
  state = {
    conceptsList: null,
    concepts: "",
    conceptValue: "",
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

    let concept = "";
    let conceptValue = "";

    if (key === "concepts") {
      concept = event.target.value;
      conceptValue = event.target.nextSibling.value;
    } else {
      conceptValue = event.target.value;
      concept = event.target.previousSibling.value;
    }

    this.setState({
      [key]: value,
    });

    this.props.handleConcept({
      id: id,
      type: concept,
      value: conceptValue,
    });
  };

  render() {
   //console.log(this.props.concepts[0].conceptValue);
    if (!this.state.conceptsList) {
      return <div>Loading my Concepts...</div>;
    }
    return this.props.concepts.map((concept, i) => {
      return (
        <div key={i} id={i}>
          <select
            id="concepts"
            defaultValue="-1"
            name="concepts"
            onChange={this.handleChange}
          >
            <option value="-1" disabled>
              Select a concept
            </option>
            {this.state.conceptsList.map((elm) => (
              <option value={elm._id} key={elm._id}>
                {elm.name}
              </option>
            ))}
          </select>
          <input
            style={{
              visibility: this.props.concepts[i].type.length === 0 ? "hidden" : "visible",
            }}
            id="conceptValue"
            // value={this.state.conceptValue}
            type="text"
            name="conceptValue"
            onChange={this.handleChange}
          />
        </div>
      );
    });
  }
}

export default OneConcept;
