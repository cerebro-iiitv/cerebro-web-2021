import React, { Component } from "react";
import "./Main.scss";
import axios from "axios";
import { GoogleLogin } from "react-google-login";
import Cookies from "js-cookie";
var parse = require('html-react-parser');

class Main extends Component {
  state = {
    auth: false,
    teamEvent: false,
  };

  componentDidMount() {
    const user = localStorage.getItem("user");
    if (user) {
      this.setState({
        auth: true,
      });
    }
  }

  createTeamHandler = (id) => {
    const { user_id, access_token } = JSON.parse(localStorage.getItem("user"));
    axios
      .post(
        "https://cerebro.pythonanywhere.com/registration/team-register/",
        {
          account: user_id,
          event: id,
        },
        {
          headers: {
            Authorization: `Token ${access_token}`,
          },
        }
      )
      .then((res) => {
        this.props.updateTeamCode(
          "Registration Successfull! Team Code: " +
            res.data.team_code +
            "✨" +
            "\n\n Go to the Dashboard"
        );
      })
      .catch((e) => {
        if (e.response.data.Error) {
          this.props.updateTeamCode(e.response.data.Error);
        } else {
          this.props.updateTeamCode(
            "Error Occured!\n Please contact the Organizer"
          );
        }
      });
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
      window.location = "/";

      // Updating values in state
      this.setState({ auth: true });
    } catch (e) {
      console.log(e);
    }
  };

  onInputChange = (event) => {
    this.setState({ inputCode: event.target.value });
  };

  joinTeamHandler = (id) => {
    const { user_id, access_token } = JSON.parse(localStorage.getItem("user"));
    axios
      .post(
        "https://cerebro.pythonanywhere.com/registration/team-register/",
        {
          account: user_id,
          event: id,
          team_code: this.state.inputCode,
        },
        {
          headers: {
            Authorization: `Token ${access_token}`,
          },
        }
      )
      .then((res) => {
        this.props.updateTeamCode(res.data.Success);
      })
      .catch((e) => {
        if (e.response.data.Error) {
          this.props.updateTeamCode(e.response.data.Error);
        } else {
          this.props.updateTeamCode("Please enter a valid Team Code!");
        }
      });
  };

  render() {
    let registerButton = null;
    let LoginBtn = <div className="main__container__content__right__reg">
   
     <GoogleLogin
          clientId="158321300884-hubsg7qr9frflo7ah3kkkurlvelooulj.apps.googleusercontent.com"
          render={(renderProps) => (
            <button
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
            className="main__container__button"
            style={{color:'white'}}
            >
              Login
            </button>
          )}
          onSuccess={this.responseGoogle}
          onFailure={this.responseGoogle}
          cookiePolicy={"single_host_origin"}
        />
  </div>

    const coConvenor = this.props.contacts.filter((contact) => {
      if (contact.role.includes("Co-Convenor")) {
        return contact.name;
      }
    });

    const member = this.props.contacts.filter((contact) => {
      if (contact.role.includes("Member")) {
        return contact.name;
      }
    });

    const eventList = this.props.events.map((event, index) => {
      if (index === this.props.index) {
        if (event.team_size > 1) {
          registerButton = (
            <div className="registerBtnContainer">
              <div
                className="main__container__content__right__reg"
                onClick={() => this.createTeamHandler(event.id)}
              >
                <span className="main__container__button">Create a team</span>
              </div>
              <div
                className="main__container__content__right__reg"
                style={{ display: "flex" }}
              >
                <input
                  onChange={this.onInputChange}
                  className="main__container__input"
                  type="text"
                  placeholder="Join a team"
                />
                <button
                  className="main__container__join"
                  onClick={() => this.joinTeamHandler(event.id)}
                >
                  Join
                </button>
              </div>
            </div>
          );
        } else {
          registerButton = (
            <div className="main__container__content__right__reg">
              <span
                className="main__container__button"
                onClick={() => this.createTeamHandler(event.id)}
              >
                Register
              </span>
            </div>
          );
        }

        return (
          <React.Fragment key={index}>
            <div className="main__container__content__left__description">
              <p>parse({event.description}) <br/><br/>
                For further communication, join our&nbsp;
                <a  
                    href="https://discord.gg/YUEeUcBtbU"
                    style={{ color: "#54cbff" }}
                    target="_blank"
                >
                  Discord Server
                </a>
              </p>
            </div>
            
          
            <div className="event-info-table-container">
              <table className="events-info-table">
                <tr>
                  <td className="events-info-table__key">Prize worth</td>
                  <td className="events-info-table__value">{event.prize}</td>
                </tr>
                <tr>
                  <td className="events-info-table__key">Team Size</td>
                  <td className="events-info-table__value">
                    {event.team_size}
                  </td>
                </tr>
                <tr>
                  <td className="events-info-table__key">Time</td>
                  <td className="events-info-table__value">
                    {event.start_time} to {event.end_time}
                  </td>
                </tr>    
              </table>
            </div>
          </React.Fragment>
        );
      } else {
        return <React.Fragment key={index}></React.Fragment>;
      }
    });

    const socialMedia = this.props.events.map((event,index)=>{
      if(index===this.props.index)
      return(
        <a  
            href={event.social_media}
            style={{ color: "#54cbff" }}
            target="_blank"
        >
          Social Media
        </a>
      )
      else return null;
    });
    
    return (
      <div className="main">
        <div className="main__container">
          <h1 className="main__container__title">{this.props.title}</h1>
          <div
            className={
              this.props.events[this.props.index]?.team_size > 1
                ? "main__container__content withJoin"
                : "main__container__content withOutJoin"
            }
          >
            <div className="main__container__content__left">{eventList}</div>
            <span className="main__container__content__vl"></span>
            <div className="main__container__content__right">
              <table className="events-info-table">
                <tr>
                  <td className="events-info-table__key">Convenor</td>
                  <td className="events-info-table__value">
                    {this.props.contacts[0].name}
                    <p className="events-info-table__value__call">
                      <i className="fa fa-phone"></i>{" "}
                      {this.props.contacts[0].phone_number}
                    </p>
                  </td>
                </tr>
                <tr>
                  <td className="events-info-table__key">Co-Convenor</td>
                  <td className="events-info-table__value">
                    {coConvenor[0]?.name}
                    {coConvenor[0]?.phone_number && (
                      <p className="events-info-table__value__call">
                        <i className="fa fa-phone"></i>{" "}
                        {coConvenor[0]?.phone_number}
                      </p>
                    )}
                  </td>
                </tr>
                {coConvenor[1] && (
                  <tr>
                    <td className="events-info-table__key">Co-Convener</td>
                    <td className="events-info-table__value">
                      {coConvenor[1].name}
                      {coConvenor[1].phone_number && (
                        <p className="events-info-table__value__call">
                          <i className="fa fa-phone"></i>{" "}
                          {coConvenor[1].phone_number}
                        </p>
                      )}
                    </td>
                  </tr>
                )}
                {member.length > 0 ? (
                  <tr>
                    <td className="events-info-table__key">Members</td>
                    {member.length > 1 ? (
                      <td className="events-info-table__value">
                        {member[0].name} , {member[1].name}
                      </td>
                    ) : (
                      <td className="events-info-table__value">
                        {member[0].name}
                      </td>
                    )}
                  </tr>
                ) : null}
              </table>
              <div
                style={{display: "flex", flexDirection: "column", rowGap: "10px"}}
              >
                <a
                  style={{ color: "#1bbcf1" }}
                  target="_blank"
                  rel="noopener noreferrer"
                  href={this.props.pdf}
                >
                  Rules and Regulations
                </a>
                {socialMedia}
              </div>
            </div>
          </div>
        </div>
        {this.state.auth ? registerButton : LoginBtn}
        {/* {registerButton} */}
        <p className="confirmationMsg">{this.props.teamCode}</p>
      </div>
    );
  }
}

export default Main;
