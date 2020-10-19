import React, { Component } from "react";
import apiHandler from "../../api/apiHandler";
import FormFeeling from "../../components/Forms/FormFeeling";
import Formsome from "../../components/Forms/FormSome";

class Some extends Component {
  state = {
    someList: null,
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

  setFeeling = (event) => {
    this.setState({
      feeling: <FormFeeling handleFeeling={this.addFeeling} />,
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
      },
      () =>
        this.props.handleValue({
          someValue: this.state.someValue,
        })
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
      <div style={{ display: "flex" }}>
        <span>Who ?</span>
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
          <option value="" disabled>
            ...
          </option>
          {filteredSome.map((elm) => (
            <option value={elm._id} key={elm._id}>
              {elm.value}
            </option>
          ))}
        </select>
        or
        <Formsome concept={this.props.someType} handleSome={this.addSome} />
        <div>{this.state.feeling}</div>
      </div>
    );
  }
}

export default Some;
