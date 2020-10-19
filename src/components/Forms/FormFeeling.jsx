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
    return (
      <div>
        <label htmlFor="feeling">Feeling</label>
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
