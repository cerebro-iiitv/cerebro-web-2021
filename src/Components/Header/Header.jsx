import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "./Header.scss";
import Navbar from "./BurgerMenu/Navbar";
import "font-awesome/css/font-awesome.min.css";
// import Modal from "react-responsive-modal";
import { GoogleLogin } from "react-google-login";
import axios from 'axios';
import Cookies from 'js-cookie';

class Header extends Component {
  state = {
    user_id: null,
    firstName: null,
    lastName: null,
    email: null,
    imageUrl: null,
    mobile_number: null,
    accessToken: Cookies.get("accessToken")
  };

  componentDidMount() {
    // console.log('Loading')
    const token = Cookies.get("accessToken");
    const user = JSON.parse(localStorage.getItem('user'));
    // console.log(user)
    if (token && user) {
      this.setState(user);
    } else {
      Cookies.set('accessToken', null);
    }
  }

  responseGoogle = async (res) => {
    console.log(res);
    try {
      // Storing accessToken as a cookie
      Cookies.set('accessToken', res.uc.access_token)

      // Post access token to get user_id
      let result = await axios.post('https://cerebro.pythonanywhere.com/account/googlelogin/', { 'Token': res.uc.access_token });
      console.log(result.data.user_id)
      const user = {
        user_id: result.data.user_id,
        firstName: res.profileObj.givenName,
        lastName: res.profileObj.familyName,
        email: res.profileObj.email,
        mobile_number: '',
        imageUrl: res.profileObj.imageUrl
      };

      // updating values in localstorage
      localStorage.setItem('user', JSON.stringify(user));

      // Updating values in state
      this.setState(user)
    } catch (e) {
      console.log(e)
    }
  }

  render() {
    
    return (
      <div>
        <nav className="navbar">
          <Navbar />
          <img className="navbar__logo" alt="" src="media/logo-without-name.png"></img>

          <ul className="navbar__links">
            <NavLink className="navbar__links__li" exact to="/"><li>HOME</li></NavLink>
            <NavLink className="navbar__links__li" exact to="/events"><li>Events</li></NavLink>
            <NavLink className="navbar__links__li" exact to="/team"><li>Team</li></NavLink>
            <NavLink className="navbar__links__li" exact to="/timeline"><li>timeline</li></NavLink>
            <a className="navbar__links__li"
              href="https://yashshah2820.pythonanywhere.com/media/pdfs/cerebro-brochure.pdf"
            > Brochure </a>
          </ul>
          {
            this.state.user_id ?
              <div className="navbar__login">
                <NavLink to="/user-dashboard">
                  <img className="navbar__user" src={this.state.imageUrl} alt="user" />
                </NavLink>
              </div>
              :
              <GoogleLogin
                clientId="646722007534-bn7ekn1cnvl4am4umntss50eardh9bs5.apps.googleusercontent.com"
                render={renderProps => (
                  <button onClick={renderProps.onClick} disabled={renderProps.disabled} className="navbar__login">
                    <img className="g_img" src="media/google.png" alt="" />
                  </button>
                )}
                onSuccess={this.responseGoogle}
                onFailure={this.responseGoogle}
                cookiePolicy={'single_host_origin'}
              />
          }
        </nav>
      </div>
    );
  }
}

export default Header;
