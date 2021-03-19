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
      auth: false
    };
  }

  async componentDidMount() {
    document.getElementById("root-loader").style.display = "none";
  }

  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/events" component={Events} />
        <Route path="/team" component={Team} />
        <Route path="/timeline" component={Timeline}/>
        <Route
          path="/user-dashboard"
          component={UserDashboard} />
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
