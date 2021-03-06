import React, { Component } from "react";
import ConceptCard from "../../components/ConceptCard";
import apiHandler from "../../api/apiHandler";
import { Link } from "react-router-dom";


class Concepts extends Component {
  state = {
    concepts: [],
  };

  componentDidMount() {
    apiHandler
      .getAll("/api/concepts")
      .then((apiRes) => {
        this.setState({ concepts: apiRes.data });
      })
      .catch((apiErr) => {
        console.log(apiErr);
      });
  }

  deleteOne(id) {
    apiHandler
      .deleteOne("/api/concepts/", id)
      .then((apiRes) => this.componentDidMount())
      .catch((apiErr) => console.log(apiErr));
  }

  render() {
    return (
      <div className="one-dream">
        <h1>Concepts</h1>
        <Link to={`/concepts/create`}>Create</Link>
        {this.state.concepts.map((concept) => (
          <React.Fragment key={concept._id}>
            <ConceptCard
              key={concept._id}
              id={concept._id}
              name={concept.name}
              image={concept.image}
            />
            <Link to={this.props} onClick={() => this.deleteOne(concept._id)}>Delete</Link>
            <Link to={`/concepts/${concept._id}/edit`}>Edit</Link>
          </React.Fragment>
        ))}
      </div>
    );
  }
}

export default Concepts;
