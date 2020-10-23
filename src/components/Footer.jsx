import React from "react";
import { NavLink } from "react-router-dom";
import { withUser } from "./Auth/withUser";
import apiHandler from "../api/apiHandler";

import "../styles/NavMain.css";

const Footer = (props) => {
  const { context } = props;

  return (
    <nav className="footer">
      <ul className="footer-list">

          <React.Fragment>
            <li>
              <NavLink exact className="underline" to="/dreams/create">Re•member</NavLink>
            </li>
          </React.Fragment>
 
          <React.Fragment>
            <li>
              <NavLink exact className="underline" to="/dreams">Re•wind</NavLink>
            </li>
          </React.Fragment>

          <React.Fragment>
            <li>
              <NavLink className="underline" to="/profile">Re•port</NavLink>
            </li>
          </React.Fragment>
        
      </ul>
    </nav>
  );
};

export default withUser(Footer);
