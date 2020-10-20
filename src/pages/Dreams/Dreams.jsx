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
      <div className="one-dream">
        <h1 className="dream">Dreamember</h1>
        <NavLink to={`/dreams/create`}>Create</NavLink>
        {this.state.dreams.map((dream) => (
          <React.Fragment key={dream._id}>
            <DreamCard id={dream._id} name={dream.name} />
            <div className="dream-tools">
              <Link className="tool" to={`/dreams/${dream._id}/`}>
                <i className="fas fa-book-open"></i>
              </Link>
              <Link className="tool" to={`/dreams/${dream._id}/edit`}>
                <i className="fas fa-pen-nib"></i>
              </Link>
              <Link
                className="tool"
                to={this.props}
                onClick={() => this.deleteOne(dream._id)}
              >
                <i className="fas fa-times"></i>
              </Link>
            </div>
          </React.Fragment>
        ))}
      </div>
    );
  }
}

export default Dreams;
