import React, { Component } from "react";
import { UserContext } from "../components/Auth/UserContext";
import apiHandler from "../api/apiHandler";
import {
  XYPlot,
  XAxis,
  YAxis,
  HorizontalGridLines,
  LineSeries,
  LabelSeries,
  VerticalBarSeries,
} from "react-vis";

class Profile extends Component {
  static contextType = UserContext;

  state = {
    name: "",
    email: "",
    password: "",
    somes: [],
    someOne: [],
    someWhere: [],
    someThing: [],
    feelings: [],
    countedFeels: [],
  };

  componentDidMount() {
    apiHandler
      .getAll("/api/dreams")
      .then((apiRes) => {
        const dreams = apiRes.data;
        const dataArr = [];
        const mergeAll = [];
        const getFeelings = [];
        for (const [index, item] of apiRes.data.entries()) {
          // console.log(item.concepts);

          getFeelings.push(item.feel);
          // this.setState({ somes: dataArr });
        }
        this.setState({ feelings: getFeelings });
        for (const [index, item] of dreams.entries()) {
          // console.log(item.concepts);

          dataArr.push(item.concepts);
          // this.setState({ somes: dataArr });
        }
        // console.log(dataArr);
        for (const [index, items] of dataArr.entries()) {
          // console.log(item[index]);
          // newArr.push(item[index]);
          // this.setState({ somes: dataArr });
          for (const [index, item] of items.entries()) {
            apiHandler
              .getOne("/api/concepts/", item.type)
              .then((apiRes) => {
                // console.log(apiRes);
                item.type = apiRes.data.name;
                //console.log(item);

                apiHandler
                  .getOne("/api/some/", item.some)
                  .then((apiRes) => {
                    // console.log(apiRes);
                    item.some = apiRes.data.value;
                    //  console.log(item);
                    mergeAll.push(item);
                    this.setState({ somes: mergeAll }, this.count());
                  })
                  .catch((apiErr) => {
                    console.log(apiErr);
                  });
              })
              .catch((apiErr) => {
                console.log(apiErr);
              });
          }
        }
      })
      .catch((apiErr) => {
        console.log(apiErr);
      });
  }

  count = () => {
    this.countOne();
    this.countThing();
    this.countWhere();
    this.countFeelings();
  };

  countFeelings = () => {
    const data = this.state.feelings;

    let cleanedFeels = Array.from(new Set(data));
    //console.log(cleanedSomes);

    const finalArr = [];
    for (const [index, item] of cleanedFeels.entries()) {
      // console.log(item.concepts);
      finalArr.splice(index, 1, {
        x: item,
        y: data.reduce(function (n, feel) {
          return n + (feel == item);
        }, 0),
        label: String(
          data.reduce(function (n, feel) {
            return n + (feel == item);
          }, 0)
        ),
      });

      finalArr.sort((b, a) =>
        a.count > b.count ? 1 : b.count > a.count ? -1 : 0
      );

      // console.log(finalArr);
      // this.setState({ somes: dataArr });
    }

    this.setState({ countedFeels: finalArr });
    // var numBoys = data.reduce(function (n, dream) {
    //   return n + (dream.some == "Emily");
    // }, 0);

    // console.log(numBoys);
  };

  countOne = () => {
    const data = this.state.somes.filter((some) => some.type === "one");

    const listOfSomes = [];

    for (const [index, item] of data.entries()) {
      // console.log(item.concepts);

      listOfSomes.push(item.some);
      // this.setState({ somes: dataArr });
    }

    let cleanedSomes = Array.from(new Set(listOfSomes));
    //console.log(cleanedSomes);

    const finalArr = [];
    for (const [index, item] of cleanedSomes.entries()) {
      // console.log(item.concepts);
      finalArr.splice(index, 1, {
        x: item,
        y: data.reduce(function (n, dream) {
          return n + (dream.some == item);
        }, 0),
        label: String(
          data.reduce(function (n, dream) {
            return n + (dream.some == item);
          }, 0)
        ),
      });

      finalArr.sort((b, a) =>
        a.count > b.count ? 1 : b.count > a.count ? -1 : 0
      );

      // this.setState({ somes: dataArr });
    }
    // finalArr
    this.setState({ someOne: finalArr });
    // var numBoys = data.reduce(function (n, dream) {
    //   return n + (dream.some == "Emily");
    // }, 0);

    // console.log(numBoys);
  };

  countThing = () => {
    const data = this.state.somes.filter((some) => some.type === "thing");

    const listOfSomes = [];

    for (const [index, item] of data.entries()) {
      // console.log(item.concepts);

      listOfSomes.push(item.some);
      // this.setState({ somes: dataArr });
    }

    let cleanedSomes = Array.from(new Set(listOfSomes));
    //console.log(cleanedSomes);

    const finalArr = [];
    for (const [index, item] of cleanedSomes.entries()) {
      // console.log(item.concepts);
      finalArr.splice(index, 1, {
        x: item,
        y: data.reduce(function (n, dream) {
          return n + (dream.some == item);
        }, 0),
        label: String(
          data.reduce(function (n, dream) {
            return n + (dream.some == item);
          }, 0)
        ),
      });

      // console.log(finalArr);
      // this.setState({ somes: dataArr });
      finalArr.sort((b, a) =>
        a.count > b.count ? 1 : b.count > a.count ? -1 : 0
      );
    }

    this.setState({ someThing: finalArr });
    // var numBoys = data.reduce(function (n, dream) {
    //   return n + (dream.some == "Emily");
    // }, 0);

    // console.log(numBoys);
  };

  countWhere = () => {
    const data = this.state.somes.filter((some) => some.type === "where");

    const listOfSomes = [];

    for (const [index, item] of data.entries()) {
      // console.log(item.concepts);

      listOfSomes.push(item.some);
      // this.setState({ somes: dataArr });
    }

    let cleanedSomes = Array.from(new Set(listOfSomes));
    //console.log(cleanedSomes);

    const finalArr = [];
    for (const [index, item] of cleanedSomes.entries()) {
      // console.log(item.concepts);
      finalArr.splice(index, 1, {
        x: item,
        y: data.reduce(function (n, dream) {
          return n + (dream.some == item);
        }, 0),
        label: String(
          data.reduce(function (n, dream) {
            return n + (dream.some == item);
          }, 0)
        ),
      });

      // console.log(finalArr);
      // this.setState({ somes: dataArr });
      finalArr.sort((b, a) =>
        a.count > b.count ? 1 : b.count > a.count ? -1 : 0
      );
    }

    this.setState({ someWhere: finalArr });
    // var numBoys = data.reduce(function (n, dream) {
    //   return n + (dream.some == "Emily");
    // }, 0);

    // console.log(numBoys);
  };

  handleSubmit = (event) => {
    event.preventDefault();

    apiHandler
      .updateOne("" + this.state)
      .then((apiRes) => {
        console.log(apiRes);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({ [name]: value });
  };

  render() {
    // console.log(this.state.someOne);
    // console.log(this.state.someWhere);
    // console.log(this.state.someThing);
    // console.log(this.state.countedFeels);

    if (
      !this.state.somes ||
      !this.state.someOne ||
      !this.state.someWhere ||
      !this.state.someThing ||
      !this.state.countedFeels
    ) {
      return <div></div>;
    }

    return (
      <div className="one-dream">
        <div
          style={{
            paddingBottom: "50px",
          }}
        >
          <h1 className="dream">Here's what you dream of</h1>
        </div>
        You feel
        <XYPlot height={200} width={300} xType="ordinal" color="#743ece">
          <VerticalBarSeries data={this.state.countedFeels.slice(0, 3)} />
          <XAxis />
          <LabelSeries data={this.state.countedFeels.slice(0, 3)} />
        </XYPlot>
        <div className="lists-somes">
          <div className="list-one">
            People
            {/* <ul>
              {this.state.someOne.slice(0, 5).map((someone) => (
                <li key={someone.some}>
                  {someone.some} in {someone.count} dreams
                </li>
              ))}
            </ul> */}
            <XYPlot height={200} width={300} xType="ordinal" color="#eb10db">
              <VerticalBarSeries data={this.state.someOne.slice(0, 3)} />
              <XAxis />
              <LabelSeries
                data={this.state.someOne.slice(0, 3)}
                color="white"
              />
            </XYPlot>
          </div>
          <div className="list-where">
            Places
            {/* <ul>
              {this.state.someWhere.slice(0, 5).map((somewhere) => (
                <li key={somewhere.some}>
                  {somewhere.some} in {somewhere.count} dreams
                </li>
              ))}
            </ul> */}
            <XYPlot height={200} width={300} xType="ordinal" color="#eb10db">
              <VerticalBarSeries data={this.state.someWhere.slice(0, 3)} />
              <XAxis />
              <LabelSeries
                data={this.state.someWhere.slice(0, 3)}
                color="white"
              />
            </XYPlot>
          </div>
          <div className="list-thing">
            Things
            {/* <ul>
              {this.state.someThing.slice(0, 5).map((something) => (
                <li key={something.some}>
                  {something.some} in {something.count} dreams
                </li>
              ))}
            </ul> */}
            <XYPlot height={200} width={300} xType="ordinal" color="#eb10db">
              <VerticalBarSeries data={this.state.someThing.slice(0, 3)} />
              <XAxis />
              <LabelSeries
                data={this.state.someThing.slice(0, 3)}
                color="white"
              />
            </XYPlot>
          </div>
        </div>

        {/* <form className="form-dream" onSubmit={this.handleSubmit}>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            value={this.context.user.name}
            name="name"
            onChange={this.handleChange}
          />
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="text"
            value={this.context.user.email}
            name="email"
            onChange={this.handleChange}
          />
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            onChange={this.handleChange}
          />

          <button className="btn-dream">Update</button>
        </form> */}
      </div>
    );
  }
}

export default Profile;
