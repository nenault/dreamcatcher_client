import React, { Component } from "react";
import DreamCard from "../../components/DreamCard";
import apiHandler from "../../api/apiHandler";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";

class Dreams extends Component {
  state = {
    dreams: [],
  };

  componentDidMount() {
    apiHandler
      .getAll("/api/dreams")
      .then((apiRes) => {
        this.setState({ dreams: apiRes.data });
      })
      .catch((apiErr) => {
        console.log(apiErr);
      });
  }

  deleteOne(id) {
    apiHandler
      .deleteOne("/api/dreams/", id)
      .then((apiRes) => this.componentDidMount())
      .catch((apiErr) => console.log(apiErr));
  }

  render() {
    return (
      <div>
        <h2>Dreams</h2>
        <NavLink to={`/dreams/create`}>Create</NavLink>
        {this.state.dreams.map((dream) => (
          <React.Fragment key={dream._id}>
            <DreamCard id={dream._id} name={dream.name} />
            <Link to={this.props} onClick={() => this.deleteOne(dream._id)}>
              Delete
            </Link>
            <Link to={`/dreams/${dream._id}/edit`}>Edit</Link>
            <Link to={`/dreams/${dream._id}/`}>See</Link>
          </React.Fragment>
        ))}
      </div>
    );
  }
}

export default Dreams;
