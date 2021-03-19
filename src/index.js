import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./Components/Home/Home";
import Timeline from "./Components/Timeline/Timeline";
import "./scss/_base.scss";
import "./fonts.css";
import Team from "./Components/Team/Team";
import Events from "./Components/Events/Events";
import UserDashboard from "./Components/UserDashboard/UserDashboard";
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      events: [],
      auth:false
    };
  }

  componentDidMount() {
    this.eventGenerator()
    document.getElementById("root-loader").style.display = "none";
  }

  eventGenerator() {
    const url = "https://cerebro.pythonanywhere.com/events/";
    fetch(url)
      .then(res => {
        return res.json()
      })
      .then(data => {
        console.log(data)
        this.setState({ events: data });
      })
      .catch(console.log);
  }


  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route
          path="/events"
          render={props => (
            <Events events={this.state.events} />
          )}
        />
        <Route path="/team" component={Team} />
        <Route
          path="/timeline"
          render={props => <Timeline events={this.state.events} />}
        />
        <Route
          path="/user-dashboard"
          component={UserDashboard}/>
      </Switch>
    );
  }
}

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
