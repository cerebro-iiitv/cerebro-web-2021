import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import RegisteredEvent from "../UserDashboard/RegisteredEvent/RegisteredEvent";
import "./UserDashboard.scss";
import axios from "axios";
import { Redirect } from "react-router-dom";

class UserDashboard extends React.Component {
  state = {
    details: {},
    number: null,
    responseMsg: null,
  };

  componentDidMount() {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      axios
        .get(`https://cerebro.pythonanywhere.com/dashboard/${user.user_id}`, {
          headers: {
            Authorization: `Token ${user.access_token}`,
          },
        })
        .then((res) => {
          this.setState({
            details: res,
            number: res.data?.mobile_number,
          });
        });
    }
  }
  onNumberSubmit = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (this.state.number.length === 10) {
      axios
        .patch(
          `https://cerebro.pythonanywhere.com/dashboard/${user.user_id}/`,
          { mobile_number: this.state.number },
          {
            headers: {
              Authorization: `Token ${user.access_token}`,
            },
          }
        )
        .then((res) => {
          this.setState({
            responseMsg: "Number updated successfully!",
          });
        });
    } else {
      this.setState({
        responseMsg: "Mobile number should be of 10 digits",
      });
    }
  };

  onDeleteEvent = (id) => {
    const user = JSON.parse(localStorage.getItem("user"));

    axios
      .delete(
        `https://cerebro.pythonanywhere.com/registration/team-register/${id}`,
        {
          headers: {
            Authorization: `Token ${user.access_token}`,
          },
        }
      )
      .then((res) => {
        const temp = this.state.details.data?.user_team.filter((event) => {
          return event.id !== id;
        });
        const obj = {
          ...this.state.details,
        };
        obj.data.user_team = temp;
        this.setState({
          details: obj,
          number: this.state.details.data?.mobile_number,
        });
      });
  };

  render() {
    const RegisteredEvents = this.state.details.data?.user_team?.length
      ? this.state.details.data.user_team.map((e) => {
          return (
            <RegisteredEvent
              name={e.event_name}
              start={e.start_time}
              end={e.end_time}
              code={e.team_code}
              id={e.id}
              onDeleteEvent={this.onDeleteEvent}
            />
          );
        })
      : null;

    const user = localStorage.getItem("user");

    if (user) {
      return (
        <div>
          <Header />
          <div className="user">
            <div className="user-events">
              <span className="user-events__header">Registered Events</span>
              <div className="user-events__registered">{RegisteredEvents}</div>
            </div>
            <div className="user-details">
              <div>
                <img className="spaceship" src="media/spaceShip.svg" alt="" />
              </div>
              <div className="user-details__name">
                <span>{this.state.details.data?.first_name}</span>
              </div>
              <div
                style={{
                  display: "flex",
                  flexFlow: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <input
                  style={{ margin: "0", marginTop: "10px", fontSize: "18px" }}
                  type="number"
                  value={this.state.number}
                  placeholder="Contact Number"
                  className="user-details__number"
                  onChange={(e) =>
                    this.setState({
                      ...this.state,
                      number: e.target.value,
                    })
                  }
                ></input>
                <button
                  style={{ margin: "0", marginTop: "10px" }}
                  className="userSubmit"
                  onClick={this.onNumberSubmit}
                >
                  Save
                </button>
                <p style={{ marginTop: "15px" }}>{this.state.responseMsg}</p>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      );
    } else {
      return <Redirect to="/" />;
    }
  }
}

export default UserDashboard;
