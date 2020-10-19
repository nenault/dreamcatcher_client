import React, { Component } from "react";
import apiHandler from "../../api/apiHandler";

class OneDream extends Component {
  state = {
    dream: null,
    concepts: [],
  };

  componentDidMount() {
    apiHandler
      .getOne("/api/dreams/", this.props.match.params.id)
      .then((apiRes) => {
        //  console.log(apiRes.data);
        this.setState({ dream: apiRes.data });
        this.buildDream(apiRes.data.concepts);
      })
      .catch((apiErr) => {
        console.log(apiErr);
      });
  }

  buildDream = (data) => {
    for (const [index, item] of data.entries()) {
      apiHandler
        .getOne("/api/some/", item.some)
        .then((apiRes) => {
          data[index].some = apiRes.data.value;

          const copyConcepts = [...this.state.concepts];

          copyConcepts.splice(index, 1, data[index]);

          this.setState({ concepts: copyConcepts });

          for (const [index, item] of copyConcepts.entries()) {
            apiHandler
              .getOne("/api/concepts/", item.type)
              .then((apiRes) => {
                data[index].type = apiRes.data.name;
                data[index].img = apiRes.data.image;
              })
              .catch((apiErr) => {
                console.log(apiErr);
              });
          }
        })
        .catch((apiErr) => {
          console.log(apiErr);
        });
    }
  };

  render() {
   // console.log(this.state.concepts);
    if (!this.state.dream) {
      return <div></div>;
    }
    return (
      <div>
        <h1>{this.state.dream.name}</h1>
        <h4>{this.state.dream.date}</h4>
        <h3>{this.state.dream.feel}</h3>
        {this.state.concepts.map((concept, i) => (
            <div key={i}>
             {concept.some} : 
             {concept.feeling}
            </div>
          ))}
      </div>
    );
  }
}

export default OneDream;
