import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "./Header.scss";
import Navbar from "./BurgerMenu/Navbar.jsx";
import "font-awesome/css/font-awesome.min.css";
// import Modal from "react-responsive-modal";
import { GoogleLogin } from "react-google-login";
import axios from "axios";
import Cookies from "js-cookie";
import Logout from "./Logout";

class Header extends Component {
  state = {
    user_id: null,
    firstName: null,
    lastName: null,
    email: null,
    imageUrl: null,
    mobile_number: null,
    accessToken: Cookies.get("accessToken"),
  };

  componentDidMount() {
    const token = Cookies.get("accessToken");
    const user = JSON.parse(localStorage.getItem("user"));
    if (token && user) {
      this.setState(user);
    } else {
      Cookies.set("accessToken", null);
    }
  }

  handleModal = () => {
    const modal = document?.getElementById("modal");
    const backdrop = document?.getElementById("backdrop");

    modal.classList.toggle("modal_visible");
    backdrop.classList.toggle("modal_visible");
  };

  responseGoogle = async (res) => {
    let token;
    try {
      // Post access token to get user_id
      if (!!res?.uc) {
        token = res.uc.access_token;
      } else {
        token = res.tc.access_token;
      }
      let result = await axios.post(
        "https://cerebro.pythonanywhere.com/account/googlelogin/",
        { Token: token }
      );

      Cookies.set("accessToken", result.data.access_token);
      const user = {
        user_id: result.data.user_id,
        firstName: res.profileObj.givenName,
        lastName: res.profileObj.familyName,
        email: res.profileObj.email,
        mobile_number: "",
        imageUrl: res.profileObj.imageUrl,
        access_token: result.data.access_token,
      };

      // updating values in localstorage
      localStorage.setItem("user", JSON.stringify(user));

      // Updating values in state
      this.setState(user);
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    return (
      <div>
        <nav className="navbar">
          <Navbar />
          <img
            className="navbar__logo"
            alt=""
            src="media/logo-without-name.png"
          ></img>

          <ul className="navbar__links">
            <NavLink className="navbar__links__li" exact to="/">
              <li>HOME</li>
            </NavLink>
            <NavLink className="navbar__links__li" exact to="/events">
              <li>Events</li>
            </NavLink>
            <NavLink className="navbar__links__li" exact to="/team">
              <li>Team</li>
            </NavLink>
            <NavLink className="navbar__links__li" exact to="/timeline">
              <li>timeline</li>
            </NavLink>
            <a
              className="navbar__links__li"
              href="https://cerebro.pythonanywhere.com/media/docs/cerebro-brochure.pdf"
            >
              {" "}
              Brochure{" "}
            </a>
          </ul>
          {this.state.user_id ? (
            <div>
              <div id="modal" className="modal">
                <NavLink to="/user-dashboard">
                  <p>Dash Board</p>
                </NavLink>
                <div
                  onClick={async () => {
                    const res = await axios(
                      "https://cerebro.pythonanywhere.com/account/logout/",
                      {
                        headers: {
                          Authorization: `token ${
                            JSON.parse(localStorage.getItem("user"))
                              .access_token
                          }`,
                        },
                      }
                    );
                    if (res.status === 200) {
                      Cookies.remove("accessToken");
                      localStorage.removeItem("user");
                      window.location = "/";
                    }
                  }}
                >
                  <p style={{ cursor: "pointer" }}>Log Out</p>
                </div>
              </div>
              <div
                id="backdrop"
                className="backdrop"
                onClick={this.handleModal}
              ></div>
              <div className="navbar__login" onClick={this.handleModal}>
                <img
                  className="navbar__user"
                  src={this.state.imageUrl}
                  alt="user"
                />
              </div>
            </div>
          ) : (
            <GoogleLogin
              clientId="158321300884-hubsg7qr9frflo7ah3kkkurlvelooulj.apps.googleusercontent.com"
              render={(renderProps) => (
                <button
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                  className="navbar__login"
                >
                  <img className="g_img" src="media/google.png" alt="" />
                </button>
              )}
              onSuccess={this.responseGoogle}
              onFailure={this.responseGoogle}
              cookiePolicy={"single_host_origin"}
            />
          )}
        </nav>
      </div>
    );
  }
}

export default Header;
