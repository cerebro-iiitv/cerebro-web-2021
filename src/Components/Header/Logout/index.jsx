import axios from "axios";
import Cookies from "js-cookie";
import React from "react";
import { NavLink } from "react-router-dom";

import { handleModal, handleLogout } from "./common";

import "../Header.scss";

function Logout(props) {
  return (
    <div className="navbar__user-desktop">
      <div id="modal" className="modal">
        <NavLink to="/user-dashboard">
          <p>Dash Board</p>
        </NavLink>
        <div onClick={handleLogout}>
          <p style={{ cursor: "pointer" }}>Log Out</p>
        </div>
      </div>
      <div id="backdrop" className="backdrop" onClick={handleModal}></div>
      <div className="navbar__login" onClick={handleModal}>
        <img className="navbar__user" src={props.imageUrl} alt="user" />
      </div>
    </div>
  );
}

export default Logout;
