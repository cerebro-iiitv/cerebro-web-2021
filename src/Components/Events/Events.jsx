import React, { Component } from "react";

import Header from "../Header/Header";
import Sidelist from "./Sidelist/Sidelist";
import Main from "./Main/Main";
import "./Events.scss";
import Circle from "./Circle/Circle";
class Events extends Component {
  componentDidMount() {
    window.scroll(0, 0);
  }
  constructor(props) {
    super(props);

    this.state = {
      eventIndex: 0,
      selectedEvent: "BTQ",
      pdf:
        "https://github.com/cerebro-iiitv/cerebro-web-2020/files/4276790/Tech.Hunt.pdf",
      teamCode:null
    };
  }
  updateEvent = (index, event, pdf) => {
    this.removeteamCode()
    console.log(index,event,pdf)
    this.setState({
      eventIndex: index,
      selectedEvent: event,
      pdf: pdf
    });
  };

  updateteamCode = (code) => {
    this.setState({ 
      teamCode:code
    })
  }

  removeteamCode = () => {
    this.setState({
      teamCode:null
    })
  }

  render() {
    const { events, contacts } = this.props;
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
              events={events}
              index={this.state.eventIndex}
              title={this.state.selectedEvent}
              contacts={contacts}
              pdf={this.state.pdf}
              teamCode = {this.state.teamCode}
              updateTeamCode = {this.updateteamCode}
            />
          </div>
          <div>
            <Sidelist
              events={events}
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