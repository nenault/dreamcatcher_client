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
    const withoutLast = this.state.dreams;
    withoutLast.reverse();
    const lastOne = this.state.dreams[0];
    withoutLast.shift();

    //  console.log(this.state.dreams[1]);
    return (
      <div className="one-dream">
        <h1 className="dreams-list">Here are the list of all your dreams</h1>
        {lastOne && (
          <>
            <p
              style={{
                marginTop: "20px",
              }}
            >
              After the last one, you woke up{" "}
              <span
                style={{
                  color: "#eb10db",
                }}
              >
                {lastOne.feel.toLowerCase()}
              </span>
              &nbsp;and you decided to name it <q>{lastOne.name}</q>
              ,&nbsp;remember?
              <br />
              You can go and{" "}
              <Link
                style={{
                  color: "#896fac",
                }}
                to={`/dreams/${lastOne._id}/`}
              >
                read it
              </Link>
              , or{" "}
              <span
                style={{
                  color: "#896fac",
                }}
                onClick={() => this.deleteOne(lastOne._id)}
              >
                delete it
              </span>{" "}
              if necessary.
            </p>
            <p
              style={{
                marginTop: "20px",
              }}
            >
              And of course, here is the list of all the others:
            </p>
          </>
        )}
        <div className="dreams-fulllist">
          {withoutLast.map((dream) => (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
              key={dream._id}
            >
              <div
                style={{
                  marginTop: "12px",
                }}
                className="dream-tools"
              >
                {dream.isProtected === true && <i className="fas fa-lock"></i>}
                {dream.isProtected === false && (
                  <i className="fas fa-lock-open"></i>
                )}{" "}
                <DreamCard id={dream._id} name={dream.name} />
              </div>
              <div style={{
                  marginTop: "12px",
                }}>
                <Link
                  style={{
                    color: "#896fac",
                  }}
                  className="tool"
                  to={`/dreams/${dream._id}/`}
                >
                  read
                </Link>
                {/* <Link className="tool" to={`/dreams/${dream._id}/edit`}>
                <i className="fas fa-pen-nib"></i>
              </Link> */}
                <Link
                  style={{
                    color: "#896fac",
                  }}
                  className="tool"
                  to={this.props}
                  onClick={() => this.deleteOne(dream._id)}
                >
                  delete
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Dreams;
