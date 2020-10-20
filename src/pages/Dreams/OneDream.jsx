import React, { Component } from "react";
import apiHandler from "../../api/apiHandler";
import dream from "../../styles/dream.css";

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

                const copyConcepts = [...this.state.concepts];

                copyConcepts.splice(index, 1, data[index]);

                this.setState({ concepts: copyConcepts });
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
    console.log(this.state.concepts);

    if (!this.state.dream) {
      return <div></div>;
    }
    const getDate = this.state.dream.date.split("T")[0].split("-");
    const formatedDate = `${getDate[2]}-${getDate[1]}-${getDate[0]}`;
    return (
      <div className="one-dream">
        <h1 className="dream">{this.state.dream.name}</h1>
        {/* <h4>{formatedDate}</h4> */}
        {/* <h3>{this.state.dream.feel}</h3> */}
        <div className="somes">
          {this.state.concepts.map((concept, i) => (
            <div
              key={i}
              style={{
                backgroundImage: `url("${concept.img}")`,
                backgroundSize: "90%",
                backgroundPosition: "center center",
                backgroundRepeat: "no-repeat",
              }}
              className={"some-item " + this.state.dream.feel}
            >
            <p className="dream-type">{concept.type}</p>
              {/* <img src={concept.img} alt={concept.some} /> */}
              <h2 className="dream-title">{concept.some}</h2>
              <p className="dream-feeling">{concept.feeling}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default OneDream;
