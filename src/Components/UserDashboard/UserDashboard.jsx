import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import RegisteredEvent from "../UserDashboard/RegisteredEvent/RegisteredEvent";
import "./UserDashboard.scss"



class UserDashboard extends React.Component{


  state={
    details:{}
  }
  
  componentDidMount(){
    const user_id = localStorage.getItem('user_id')
    if(user_id){
      fetch(`https://cerebro.pythonanywhere.com/dashboard/${user_id}`)
      .then(res=>res.json())
      .then(data=>{
        console.log(data)
        this.setState({details:data})
      })
      // this.fetchCall(user_id)
    }
  }


   

  // fetchCall = async (user_id) => {
  //   let json;
  //   try{
  //     const res = await fetch(`https://cerebro.pythonanywhere.com/dashboard/${user_id}`);
  //     json= await res.json();
  //     console.log(json)
  //     }
  //     catch(e){
  //     console.log(e , json)
  //     }
  // }

  

  render(){  
    // const a =[1,2,3];
    // const RegisteredEvents = a.map((e)=> <RegisteredEvent/>)

    const RegisteredEvents = this.state.details.user_team?.length ? this.state.details.user_team.map((e)=>{return <RegisteredEvent name={e.event_name} code = {e.team_code}/>}) : null;



    return(
        <div>
            <Header/>
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
                    <img className="spaceship" src="media/spaceShip.svg" />
                  </div>
                  <div className="user-details__name">
                    <span>{this.state.details.first_name}</span>
                  </div>
                  <div>

                    {this.state.details.mobile_number && <div><div className="user-details__number">
                      <span>{this.state.details.mobile_number}</span>
                    </div>
                    <div className="user-details__circle"></div></div>}
                    
                  </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
  }

}

export default UserDashboard;