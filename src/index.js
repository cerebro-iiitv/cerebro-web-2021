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
import Faqs from "./Components/FAQs/Faqs";

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
        <Route path="/timeline" component={Timeline} />
        <Route
          path="/user-dashboard"
<<<<<<< HEAD
          component={UserDashboard}
        />
        <Route
          path="/faqs"
          component={Faqs}
        />
=======
          component={UserDashboard} />
>>>>>>> c38e69bce1f86e8bcfdf84fd54b5af9cfd0c7248
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
