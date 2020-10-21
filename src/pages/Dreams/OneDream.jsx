import React, { Component } from "react";
import apiHandler from "../../api/apiHandler";
import dream from "../../styles/dream.css";

class OneDream extends Component {
  state = {
    dream: null,
    concepts: [],
    isProtected: true,
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

  share = (event) => {
    // console.log(this.state.dream.isProtected);

    const dreamTemp = this.state.dream;
    dreamTemp.isProtected = false
    
    this.setState(
      {
        dream: dreamTemp,
      },
      () => this.update()
    );
  };

  update = (event) => {
    // console.log(this.state.dream);
    apiHandler
      .updateOne(
        "/api/dreams/" + this.props.match.params.id,
        this.state.dream
      )
      .then((apiRes) => {
        console.log(apiRes);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    // console.log(this.state.concepts);

    if (!this.state.dream) {
      return <div></div>;
    }
    const getDate = this.state.dream.date.split("T")[0].split("-");
    const formatedDate = `${getDate[2]}-${getDate[1]}-${getDate[0]}`;

    // const getType = "",
    // if (concept.type == "one") {
    //   getType = "ni"
    // }
    return (
      // console.log(this.state.dream),
      <div className="one-dream">
        <h1 className="dream">{this.state.dream.name}</h1>
        {/* <h4>{formatedDate}</h4> */}
        <p>
          I was{" "}
          <span
            style={{
              color: "#eb10db",
            }}
          >
            {this.state.dream.feel.toLowerCase()}
          </span>{" "}
          when I woke up. <br />
          Here's what I remember about this dream...
        </p>
        {/* <h3>{this.state.dream.feel}</h3> */}
        <div className="somes">
          {this.state.concepts.map((concept, i) => (
            <React.Fragment key={i}>
              <div className={"some-item"}>
                <img
                  className="dream-img"
                  src={concept.img}
                  alt={concept.some}
                />
                <div className="dream-data">
                  {concept.type === "one" && <p className="dream-type">Who?</p>}
                  {concept.type === "thing" && (
                    <p className="dream-type">What?</p>
                  )}
                  {concept.type === "where" && (
                    <p className="dream-type">Where?</p>
                  )}
                  <h3 className="dream-title">{concept.some}</h3>
                  {concept.feeling && (
                    <p className="dream-feeling">
                      <span className="dream-thought">And I thought:</span>{" "}
                      <q>
                        <i>{concept.feeling}</i>
                      </q>
                    </p>
                  )}
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>
        <span onClick={() => this.share()}>Share this dream</span>
      </div>
    );
  }
}

export default OneDream;
