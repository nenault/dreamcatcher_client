import React from "react";
import { Switch, Route } from "react-router-dom";
import NavMain from "./components/NavMain";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import ProtectedAdminRoute from "./components/ProtectedAdminRoute";
import Profile from "./pages/Profile";
import Dreams from "./pages/Dreams/Dreams"
import EditDream from "./pages/Dreams/editDream"
import OneDream from "./pages/Dreams/OneDream"
import Concepts from "./pages/Concepts/Concepts"
import EditConcept from "./pages/Concepts/editConcept"
import CreateDream from "./pages/Dreams/CreateDream";
import CreateConcept from "./pages/Concepts/CreateConcept";
import CreateSome from "./pages/Some/CreateSome";
import Some from "./pages/Some/Some";


function App() {
  return (
    <div className="App">
      <NavMain />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/signin" component={Signin} />
        <Route exact path="/signup" component={Signup} />
        <ProtectedRoute exact path="/profile" component={Profile} />
        <ProtectedRoute exact path="/dreams" component={Dreams} />
        <ProtectedRoute exact path="/dreams/create" component={CreateDream} />
        <ProtectedRoute exact path="/dreams/:id/edit" component={EditDream} />
        <ProtectedRoute exact path="/dreams/:id" component={OneDream} />
        <ProtectedAdminRoute exact path="/concepts" component={Concepts} />
        <ProtectedAdminRoute exact path="/concepts/create" component={CreateConcept} />
        <ProtectedAdminRoute exact path="/concepts/:id/edit" component={EditConcept} />
        <ProtectedAdminRoute exact path="/some" component={Some} />
        <ProtectedAdminRoute exact path="/some/create" component={CreateSome} />
        {/* <ProtectedAdminRoute exact path="/some/:id/edit" component={EditSome} /> */}
      </Switch>
    </div>
  );
}

export default App;
