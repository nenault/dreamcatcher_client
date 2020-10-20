import React, { Component } from "react";
import apiHandler from "../../api/apiHandler";
import Some from "../../pages/Some/Some";

class OneConcept extends Component {
  state = {
    conceptsList: null,
    concepts: "",
    someValue: "",
    someType: "",
    some: "",
    id: "",
    feelingValue: "",
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
    const id = this.props.id;

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
        id: id,
      },
      () => this.setSome()
    );

    this.props.handleConcept({
      id: id,
      type: event.target.value,
      some: this.state.someValue,
      feeling: "",
    });
    // this.state.some = <Some someType={this.state.someType} />;
  };

  setSome = (event) => {
    this.setState({
      some: (
        <Some
          handleValue={this.getValue}
          liftFeeling={this.getFeeling}
          someType={this.state.someType}
        />
      ),
    });
  };

  getValue = (event) => {
    this.setState({ someValue: event.someValue }, () =>
      this.props.handleConcept({
        id: this.state.id,
        type: this.state.someType,
        some: this.state.someValue,
        feeling: "",
      })
    );
  };

  getFeeling = (event) => {
    this.setState({ feelingValue: event.feelingValue }, () =>
      this.props.handleConcept({
        id: this.state.id,
        type: this.state.someType,
        some: this.state.someValue,
        feeling: this.state.feelingValue,
      })
    );
  };

  render() {
    // console.log(this.props.concepts[0].value);
    // console.log(this.state.concepts);
    // console.log(this.props.concepts[0].conceptValue);
    // console.log(this.props.concepts[0].type);
    // console.log(this.state.some);

    if (!this.state.conceptsList) {
      return <div></div>;
    }

    return (
      <>
        <div>
          <select
            id="concepts"
            defaultValue="-1"
            // defaultValue={
            //   this.props.idEditing === "edit"
            //     ? this.props.concepts[i].type
            //       ? this.props.concepts[i].type
            //       : "-1"
            //     : "-1"
            // }
            // defaultValue={this.props.concepts[i].type}
            name="concepts"
            onChange={this.handleChange}
          >
            <option value="-1" disabled>
              ...........
            </option>
            {this.state.conceptsList.map((elm) => (
              <option value={elm._id} key={elm._id}>
                {elm.name}
              </option>
            ))}
          </select>
        </div>
        <div>{this.state.some}</div>
      </>
    );
  }
}

export default OneConcept;
