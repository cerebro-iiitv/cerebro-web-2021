import axios from "axios";
import React, { Component } from "react";
import "./Auth.scss";
import { NavLink } from "react-router-dom";

class Auth extends Component {
    state = {
        Auth: false,
        imgPath: "",
    };

    insertGapiScript() {
        const script = document.createElement("script");
        script.src = "https://apis.google.com/js/platform.js";
        script.onload = () => {
            this.initializeGoogleSignin();
        };
        document.body.appendChild(script);
    }

    initializeGoogleSignin() {
        window.gapi.load("auth2", () => {
            window.gapi.auth2.init({
                client_id:
                    "158321300884-hubsg7qr9frflo7ah3kkkurlvelooulj.apps.googleusercontent.com",
            });
            const params = {
                onSuccess: (result) => {
                    localStorage.setItem("token", result.uc.access_token);
                    localStorage.setItem("imgURL", result.Hs.jI);
                    axios
                        .post(
                            "https://cerebro.pythonanywhere.com/account/googlelogin/",
                            { Token: result.uc.access_token }
                        )
                        .then((res) => {
                            localStorage.setItem("user_id", res.data.user_id);
                        });
                },
            };
            window.gapi.signin2.render("loginButton", params);
        });
    }

    componentDidMount() {
        let token = localStorage.getItem("token");
        let imgURL = localStorage.getItem("imgURL");

        if (token) {
            this.setState({
                Auth: true,
                imgPath: imgURL,
            });
        }
        this.insertGapiScript();
    }

    render() {
        let x = this.state.Auth ? (
            <NavLink to="/user-dashboard">
                <img className="imgLogo" src={this.state.imgPath} alt="" />
            </NavLink>
        ) : (
            <div id="loginButton"></div>
        );

        return (
            // <div id="loginButton"></div>
            <div className="logoBorder">{x}</div>
        );
    }
}

export default Auth;
