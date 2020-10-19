import React, { Component } from "react";
import apiHandler from "../../api/apiHandler";
import Formsome from "../../components/Forms/FormSome";

class Some extends Component {
  state = {
    someList: null,
    lastSome: "",
    someValue: "",
    isRendering: false,
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
    this.setState({ someValue: event.target.value });
  };

  addSome = (event) => {
    apiHandler
      .getAll("/api/some")
      .then((apiRes) => {
        this.setState({ someList: apiRes.data, lastSome: event.value }, () =>
          this.setState({ isRendering: true })
        );
      })
      .catch((apiErr) => {
        console.log(apiErr);
      });
  };

  render() {
    // console.log(this.state.lastSome.length);
    console.log(this.state.isRendering, this.state.lastSome);

    if (!this.state.someList) {
      return <div>Loading...</div>;
    }
    const filteredSome = this.state.someList.filter(
      (concepts) => concepts.concept === this.props.someType
    );
    return (
      <div style={{ display: "flex" }}>
        <span>Who ?</span>
        <select
          id="some"
          defaultValue={
            this.state.isRendering == !false ? this.state.lastSome : "-1"
          }
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
          <option value="-1" disabled>
            ...
          </option>
          {filteredSome.map((elm) => (
            <option value={elm.value} key={elm._id}>
              {elm.value}
            </option>
          ))}
        </select>
        <Formsome concept={this.props.someType} handleSome={this.addSome} />
      </div>
    );
  }
}

export default Some;
