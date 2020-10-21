import React from "react";
import { NavLink } from "react-router-dom";
import { withUser } from "./Auth/withUser";
import apiHandler from "../api/apiHandler";

import "../styles/NavMain.css";

const NavMain = (props) => {
  const { context } = props;

  function handleLogout() {
    apiHandler
      .logout()
      .then(() => {
        context.removeUser();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <nav className="NavMain">
      <NavLink exact to="/">
        <h3 className="logo">Reve•le</h3>
      </NavLink>
      <ul className="nav-list">
        {/* {context.isLoggedIn && (
          <React.Fragment>
            <li>
              <NavLink to="/dreams">Dreams</NavLink>
            </li>
          </React.Fragment>
        )}
        {context.isAdmin && (
          <React.Fragment>
            <li>
              <NavLink to="/concepts">Concepts</NavLink>
            </li>
          </React.Fragment>
        )} */}
        {context.isLoggedIn && (
          <React.Fragment>
            <li>
              <p onClick={handleLogout}>Logout</p>
            </li>
          </React.Fragment>
        )}
        {!context.isLoggedIn && (
          <React.Fragment>
            <li>
              <NavLink to="/signin">Log in</NavLink>
            </li>
          </React.Fragment>
        )}
      </ul>
    </nav>
  );
};

export default withUser(NavMain);
