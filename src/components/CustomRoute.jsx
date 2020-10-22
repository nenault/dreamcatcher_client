import React, { Component } from "react";
import { Redirect, Route } from "react-router-dom";
import { withUser } from "./Auth/withUser";
import { UserContext } from "./Auth/UserContext";

// const ProtectedRoute = ({ component: Component, context, ...rest }) => {

// };

class CustomRoute extends Component {
  static contextType = UserContext;

  state = {
    redirect: "",
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (this.context.isLoading) {
      this.setState({ redirect: null });
    } else if (this.context.isLoggedIn) {
      this.setState({
        redirect: <Route render={(props) => <Component {...props} />} />,
      });
    } else {
      this.setState({ redirect: <Redirect to="/signin" /> });
    }
  }

  render() {
    return <>{this.state.redirect}</>;
  }
}

export default withUser(CustomRoute);
