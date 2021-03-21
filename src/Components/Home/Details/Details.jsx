import React from 'react';
import "./Details.scss";

const Details = ()=>{
    return (
        <div className="details">
            <div className="details__image">
                <img  className="details__image__UFO" src="media/Group 105@3x.png" alt="Details image UFO"/>
            </div>

            <div className="details__body">
                <div className="details__body__figures">
                    <div>
                        <span>1,20,000 INR +</span>
                    </div>

                    <div>
                        <span>18+</span>
                    </div>

                    <div>
                        <span>9+</span>
                    </div>                    
                </div>

                <div className="details__body__text">
                    <div>
                        <span>Win Prizes worth</span>
                    </div>

                    <div>
                        <span>Events to participate</span>
                    </div>

                    <div>
                        <span>Days Long Event</span>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Details;