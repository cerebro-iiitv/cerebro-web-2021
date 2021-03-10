import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import RegisteredEvent from "../UserDashboard/RegisteredEvent/RegisteredEvent";
import "./UserDashboard.scss"


class UserDashboard extends React.Component{
  state={};

  render(){  
    const a=[1,2,3]
    const RegisteredEvents = a.map((e)=>{return <RegisteredEvent/>});
    return(
        <div>
            <Header/>
            <div className="user">
                <div className="user-events">
                    <span className="user-events__header">Registered Events</span>
                    <div className="user-events__registered">{RegisteredEvents}</div>
                </div>
                <hr className="user-hr"/>
                <div className="user-details">
                  <div className="user-details__name">
                    <span>Jay Mistry</span>
                  </div>
                  <div>
                    <div className="user-details__number">
                      <span>92701 56871</span>
                    </div>
                    <div className="user-details__circle"></div>
                  </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
  }

}

export default UserDashboard;