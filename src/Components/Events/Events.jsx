import React, { Component } from "react";

import Header from "../Header/Header";
import Sidelist from "./Sidelist/Sidelist";
import Main from "./Main/Main";
import "./Events.scss";
import Circle from "./Circle/Circle";

class Events extends Component {
  constructor(props) {
    super(props);

    this.state = {
      eventIndex: 0,
      events: [{
        "contacts": [{
          "id": 1,
          "name": "",
          "role": "",
          "phone_number": ""
        },]
      }
      ],
      selectedEvent: "Tech Hunt",
      pdf:
        "https://docs.google.com/document/d/1XPZgU2EjfX9pmU6fTy1lLN62OxKtA5c-XuvYPSTjecM/edit?usp=sharing",
      teamCode: null
    };
  }

  async componentWillMount() {
    await this.eventGenerator();
    document.getElementById("root-loader").style.display = "none";
  }
  async eventGenerator() {
    const url = "https://cerebro.pythonanywhere.com/events/";
    const res = await fetch(url);
    const data = await res.json();
    this.setState({ events: data });
  }

  updateEvent = (index, event, pdf) => {
    this.removeteamCode()
    this.setState({
      eventIndex: index,
      selectedEvent: event,
      pdf: pdf
    });
  };

  updateteamCode = (code) => {
    this.setState({
      teamCode: code
    })
  }

  removeteamCode = () => {
    this.setState({
      teamCode: null
    })
  }

  render() {
    return (
      <div>
        <Header />
        <div className="event">
          <div>
            <Circle index={this.state.eventIndex} />
          </div>
          <div className="event__rightContainer">
            <div>
              <Main
                events={this.state.events}
                index={this.state.eventIndex}
                title={this.state.selectedEvent}
                contacts={this.state.events[this.state.eventIndex].contacts}
                pdf={this.state.pdf}
                teamCode={this.state.teamCode}
                updateTeamCode={this.updateteamCode}
              />
            </div>
            <div>
              <Sidelist
                events={this.state.events}
                updateEvent={this.updateEvent}
                index={this.state.eventIndex}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Events;