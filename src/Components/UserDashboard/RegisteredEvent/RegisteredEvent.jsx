import React from "react";
import "./RegisteredEvents.scss";

const RegisteredEvents = (props) => {
    return (
        <div className="registered-event">
            <div className="registered-event__titleContainer">
                <span className="registered-event_title">{props.name}</span>
                <p className="registered-event__code">{props.code}</p>
            </div>

            <span className="registered-event_date">
                {props.start} to {props.end}
            </span>
            <div>
                <img
                    src="media/delete_icon.png"
                    alt="delete_icon"
                    className="registered-event_delete"
                    onClick={() => props.onDeleteEvent(props.id)}
                />
            </div>
        </div>
    );
};

export default RegisteredEvents;
