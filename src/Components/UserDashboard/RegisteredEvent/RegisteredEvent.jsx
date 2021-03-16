import React from "react";
import "./RegisteredEvents.scss";


const RegisteredEvents = (props)=>{
    return(
        <div className="registered-event">
            <div className="registered-event__titleContainer">
                <span className="registered-event_title">{props.name}</span>
                <p>{props.code}</p>
            </div>
            
            <span className="registered-event_date">27 March, 10:00-11:00</span>
            <div>
                <img
                    src="media/delete_icon.png"
                    alt="delete_icon"
                    className="registered-event_delete"
                />
            </div>
        </div>
    )
};

export default RegisteredEvents;