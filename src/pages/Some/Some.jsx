import React, { Component } from "react";
import apiHandler from "../../api/apiHandler";
import FormFeeling from "../../components/Forms/FormFeeling";
import Formsome from "../../components/Forms/FormSome";

class Some extends Component {
  state = {
    someList: null,
    addInput: "",
    someValue: "",
    feeling: "",
    feelingValue: "",
  };

  componentDidMount() {
    apiHandler
      .getAll("/api/some")
      .then((apiRes) => {
        // console.log(apiRes.data);
        this.setState({ someList: apiRes.data });
        // console.log(this.props)
        // const copyList = apiRes.data.filter(
        //   (concepts) => concepts.concept === this.props.someType
        // );

        // console.log(copyList);

        // this.setState({ someList: apiRes.data });
      })
      .catch((apiErr) => {
        console.log(apiErr);
      });
  }

  handleChange = (event) => {
    this.setState(
      { someValue: event.target.value },
      () =>
        this.props.handleValue({
          someValue: this.state.someValue,
          // feeling: this.state.feelingValue,
        }),
      this.setFeeling()
    );
  };

  addInput = (event) => {
    this.setState({
      addInput: (
        <Formsome concept={this.props.someType} handleSome={this.addSome} />
      ),
    });
  };

  setFeeling = (event) => {
    this.setState({
      feeling: (
        <FormFeeling
          key={this.state.someValue}
          handleFeeling={this.addFeeling}
        />
      ),
    });
  };

  addFeeling = (event) => {
    this.setState(
      {
        feelingValue: event.feeling,
      },
      () =>
        this.props.liftFeeling({
          feelingValue: this.state.feelingValue,
        })
    );
  };

  addSome = (some) => {
    this.setState(
      {
        someList: [...this.state.someList, some],
        someValue: some._id,
        addInput: "",
      },
      () =>
        this.props.handleValue({
          someValue: this.state.someValue,
        }),
      this.setFeeling()
    );
  };

  render() {
    // console.log(this.state.lastSome.length);
    // console.log(this.state.isRendering, this.state.lastSome);

    if (!this.state.someList) {
      return <div></div>;
    }
    const filteredSome = this.state.someList.filter(
      (concepts) => concepts.concept === this.props.someType
    );
    return (
      <div>
        <span
          style={{
            fontSize: "16px",
            marginTop: "20px",
            color: this.state.someValue.length === 0 ? "#FFF" : "#896fac",
          }}
          className="who"
        >
          That you already know?
        </span>
        <br />
        <span
          style={{
            fontSize: "16px",
            color: this.state.someValue.length === 0 ? "#FFF" : "#896fac",
          }}
          className="whos"
        >
          Oh yeah, it's{" "}
        </span>
        <select
          id="some"
          value={this.state.someValue}
          // defaultValue={
          //   this.state.isRendering == !false ? this.state.lastSome : "-1"
          // }
          // defaultValue={
          //   this.props.idEditing === "edit"
          //     ? this.props.concepts[i].type
          //       ? this.props.concepts[i].type
          //       : "-1"
          //     : "-1"
          // }
          // defaultValue={this.props.concepts[i].type}
          name="some"
          onChange={this.handleChange}
        >
          <option value="" disabled></option>
          {filteredSome.map((elm) => (
            <option value={elm._id} key={elm._id}>
              {elm.value}
            </option>
          ))}
        </select>
        <span
          style={{
            fontSize: "16px",
            color: this.state.someValue.length === 0 ? "#FFF" : "#896fac",
          }}
          className="who"
          onClick={() => this.addInput()}
        >
          Nope, let me add it <i className="fas fa-plus"></i>
        </span>

        <div>{this.state.addInput}</div>
        <div>{this.state.feeling}</div>
      </div>
    );
  }
}

export default Some;
