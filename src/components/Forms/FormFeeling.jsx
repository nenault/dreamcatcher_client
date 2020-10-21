import React, { Component } from "react";

class FormFeeling extends Component {
  state = {
    feeling: "",
  };

  handleChange = (event) => {
    this.setState({ feeling: event.target.value }, () => this.sendFeeling());
  };

  sendFeeling = (event) => {
    this.props.handleFeeling({
      feeling: this.state.feeling,
    });
  };

  render() {
    console.log(this.props);
    return (
      <div>
        <label
          style={{
            fontSize: "16px",
            color: this.state.feeling.length === 0 ? "#FFF" : "#896fac",
          }}
          className="who"
          htmlFor="feeling"
        >
          Does it make you think of anything in particular?
        </label>
        <input
          id="feeling"
          type="text"
          value={this.state.value}
          name="feeling"
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

export default FormFeeling;
