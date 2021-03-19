import React, { Component } from 'react'
import Header from '../Header/Header'
import {teamdata} from './util/Teamdata'
import TeamNames from './TeamNames/TeamNames'
import './Team.scss'
import TeamMembers from './TeamMembers/TeamMembers'

export class Team extends Component {

  state = {
    selectedTeam: Object.keys(teamdata)[0]
  }

  updateSelectedTeam = team => this.setState({selectedTeam: team})
  // async componentWillMount() {
  //   let res = await fetch('https://cerebro.pythonanywhere.com/teams/?team=core');
  //   res = await res.json();
  //   console.log(res);
  //   this.setState({ selectedTeam: res });
  // }

  // componentWillReceiveProps() {

  // }

  render() {
    return (
      <div className="team">
        <Header />
        <div className="team__container">
          <TeamNames
            selectedTeam={this.state.selectedTeam}
            teamdata={teamdata}
            selectTeam={this.updateSelectedTeam}
          />

          <TeamMembers teamName={this.state.selectedTeam} team={teamdata[this.state.selectedTeam]} />
        </div>
      </div>
    )
  }
}

export default Team
