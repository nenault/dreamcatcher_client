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
              <NavLink exact className="underline" to="/dreams/create">Write</NavLink>
            </li>
          </React.Fragment>
 
          <React.Fragment>
            <li>
              <NavLink exact className="underline" to="/dreams">Dreams</NavLink>
            </li>
          </React.Fragment>

          <React.Fragment>
            <li>
              <NavLink className="underline" to="/profile">Profile</NavLink>
            </li>
          </React.Fragment>
        
      </ul>
    </nav>
  );
};

export default withUser(Footer);
