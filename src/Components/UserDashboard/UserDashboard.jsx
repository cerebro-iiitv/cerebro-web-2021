import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import RegisteredEvent from "../UserDashboard/RegisteredEvent/RegisteredEvent";
import "./UserDashboard.scss"
import axios from "axios";

class UserDashboard extends React.Component {

  state = {
    details: {}
  }

  componentDidMount() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      axios.get(`https://cerebro.pythonanywhere.com/dashboard/${user.user_id}`, {
        headers: {
          'Authorization': `Token ${user.access_token}`
        }
      }).then(res=> {
        this.setState({ details: res })
      })
    }
  }

  onDeleteEvent = (id) => {
    const user = JSON.parse(localStorage.getItem('user'));

    axios.delete(`https://cerebro.pythonanywhere.com/registration/team-register/${id}/`, {
        headers: {
          'Authorization':`Token ${user.access_token}`
        },
    }).then(res => {
        const temp = this.state.details.data?.user_team.filter(event => {
          return event.id !== id
        })
        const obj = {
          ...this.state.details
        }
        obj.data.user_team = temp
        this.setState({
          details: obj
        })
      })
  }


  render() {

    const RegisteredEvents = this.state.details.data?.user_team?.length ? this.state.details.data.user_team.map((e) => { return <RegisteredEvent name={e.event_name} start={e.start_time} end={e.end_time} code={e.team_code} id={e.id} onDeleteEvent={this.onDeleteEvent} /> }) : null;

    return (
      <div>
        <Header />
        <div className="user">
          <div className="user-events">
            <span className="user-events__header">Registered Events</span>
            <div className="user-events__registered">{RegisteredEvents}</div>
          </div>
          {/* <div className="user-hr-container">
                  <hr className="user-hr"/>
                </div> */}

          <div className="user-details">
            <div>
              <img className="spaceship" src="media/spaceShip.svg" alt="" />
            </div>
            <div className="user-details__name">
              <span>{this.state.details.data?.first_name}</span>
            </div>
            <div>

              {this.state.details.mobile_number && <div><div className="user-details__number">
                <span>{this.state.details.mobile_number}</span>
              </div>
                <div className="user-details__circle"></div></div>}

            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

}

export default UserDashboard;