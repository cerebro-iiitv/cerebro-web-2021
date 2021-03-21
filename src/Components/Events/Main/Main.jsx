import React, { Component } from "react";
import "./Main.scss";
import axios from "axios";

class Main extends Component {
  state = {
    teamEvent: false,
  };

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
              <p>{event.description}</p>
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

    return (
      <div className="main">
        <div className="main__container">
          <h1 className="main__container__title">{this.props.title}</h1>
          <div
            className="main__container__content"
            style={{
              height:
                this.props.events[this.props.index]?.team_size > 1
                  ? "calc(100vh - 430px)"
                  : "calc(100vh - 400px)",
            }}
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
              <a
                style={{ color: "#1bbcf1" }}
                target="_blank"
                rel="noopener noreferrer"
                href={this.props.pdf}
              >
                Rules and Regulations
              </a>
            </div>
          </div>
        </div>
        {registerButton}
        <p className="confirmationMsg">{this.props.teamCode}</p>
      </div>
    );
  }
}

export default Main;
