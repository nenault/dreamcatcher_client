import React from "react";
import { Switch, Route } from "react-router-dom";
import NavMain from "./components/NavMain";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Profile";
import Dreams from "./pages/Dreams/Dreams"
import EditDream from "./pages/Dreams/editDream"
import OneDream from "./pages/Dreams/OneDream"
import Concepts from "./pages/Concepts/Concepts"
import EditConcept from "./pages/Concepts/editConcept"
import CreateDream from "./pages/Dreams/CreateDream";
import CreateConcept from "./pages/Concepts/CreateConcept";


function App() {
  return (
    <div className="App">
      <NavMain />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/signin" component={Signin} />
        <Route exact path="/signup" component={Signup} />
        <ProtectedRoute exact path="/profile" component={Profile} />
        <Route exact path="/dreams" component={Dreams} />
        <Route exact path="/dreams/create" component={CreateDream} />
        <Route exact path="/dreams/:id/edit" component={EditDream} />
        <Route exact path="/dreams/:id" component={OneDream} />
        <Route exact path="/concepts" component={Concepts} />
        <Route exact path="/concepts/create" component={CreateConcept} />
        <Route exact path="/concepts/:id/edit" component={EditConcept} />
      </Switch>
    </div>
  );
}

export default App;
