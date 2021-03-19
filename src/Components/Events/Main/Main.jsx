import React, { Component } from "react";
import "./Main.scss";
import axios from 'axios'

class Main extends Component {

  state = {
    teamEvent: false,
  }

  createTeamHandler = (id) => {
    const { user_id } = JSON.parse(localStorage.getItem('user'));
    console.log(user_id)
    axios.post('https://cerebro.pythonanywhere.com/registration/team-register/',{
      account: user_id,
      event: id
    },{
        headers: {
          'Authorization':'Token 32a66c85f4ba7c0a4cc629f30c55104cf3535088'
        },
    }
    ).then(res => {
      console.log(res.data.team_code)
      this.props.updateTeamCode('Registered ' + res.data.team_code + '\n Go to dashboard')
    }).catch(e => {
      if (e.response.data.Error) {
        console.log(e.response.data.Error);
        this.props.updateTeamCode(e.response.data.Error);
      } else {
        this.props.updateTeamCode('Some Error Occured!\n Contact Organizer');
      }
    })
  }


  onInputChange = (event) => {
    this.setState({ inputCode: event.target.value })
  }

  joinTeamHandler = (id) => {
    const user_id = localStorage.getItem('user_id')
    axios.post('https://cerebro.pythonanywhere.com/registration/team-register/', {
      account: user_id,
      event: id,
      team_code: this.state.inputCode
    },{
        headers: {
          'Authorization':'Token 32a66c85f4ba7c0a4cc629f30c55104cf3535088'
        },
    }).then(res => {
      this.props.updateTeamCode(res.data.Success)
    }).catch(e => {
      this.props.updateTeamCode('Error Occured!')
    })
  }


  render() {

    let registerButton = null


    const eventList = this.props.events.map((event, index) => {
      if (index === this.props.index) {
        if (event.team_size > 1) {
          registerButton = <div className="registerBtnContainer">
            <div className="main__container__content__right__reg" onClick={() => this.createTeamHandler(event.id)}>
              <span className="main__container__button">Create a team</span>
            </div>
            <div className="main__container__content__right__reg" style={{ display: 'flex' }}>
              <input onChange={this.onInputChange} className="main__container__input" type="text" placeholder="Join a team" />
              <button className="main__container__join" onClick={() => this.joinTeamHandler(event.id)}>Join</button>
            </div>
          </div>
        } else {
          registerButton = <div className="main__container__content__right__reg">
            <span className="main__container__button" onClick={() => this.createTeamHandler(event.id)}>Register</span>
          </div>
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
                  <td className="events-info-table__value">{event.team_size}</td>
                </tr>
                <tr>
                  <td className="events-info-table__key">Venue</td>
                  <td className="events-info-table__value">{event.venue}</td>
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
    const contact = this.props.contacts.map((contact, index) => {
      if (index === this.props.index) {
        return (
          <table className="events-info-table" key={index}>
            <tr>
              <td className="events-info-table__key">Convenor</td>
              <td className="events-info-table__value">
                {contact.convenor}
                {contact.phone_number1 && (
                  <p className="events-info-table__value__call">
                    <i className="fa fa-phone"></i> {contact.phone_number1}
                  </p>
                )}
              </td>
            </tr>
            <tr>
              <td className="events-info-table__key">Co-Convenor</td>
              <td className="events-info-table__value">
                {contact.co_convenor1}
                {contact.phone_number2 && (
                  <p className="events-info-table__value__call">
                    <i className="fa fa-phone"></i> {contact.phone_number2}
                  </p>
                )}
              </td>
            </tr>
            {contact.co_convenor2 && (
              <tr>
                <td className="events-info-table__key">Co-Convener</td>
                <td className="events-info-table__value">
                  {contact.co_convenor2}
                  {contact.phone_number3 && (
                    <p className="events-info-table__value__call">
                      <i className="fa fa-phone"></i> {contact.phone_number3}
                    </p>
                  )}
                </td>
              </tr>
            )}
            <tr>
              <td className="events-info-table__key">Members</td>
              <td className="events-info-table__value">
                {contact.member1} , {contact.member2}
              </td>
            </tr>
          </table>
        );
      } else {
        return <React.Fragment key={index}></React.Fragment>;
      }
    });

    // console.log(this.props)

    return (

      <div className="main">
        <div className="main__container">
          <h1 className="main__container__title">{this.props.title}</h1>
          <div className="main__container__content">
            <div className="main__container__content__left">{eventList}</div>
            <span className="main__container__content__vl"></span>
            <div className="main__container__content__right">
              {contact}
              <a style={{ color: '#1bbcf1' }} href={this.props.pdf}>Rules and Regulations</a>
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
