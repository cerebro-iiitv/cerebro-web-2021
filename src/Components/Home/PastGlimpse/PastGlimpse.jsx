import React from "react";
import "./PastGlimpse.scss";

const PastGlimpse = () => {
  
  return (
    <div className="gallery">
      <h1 className="gallery__title section-title">Past year Glimpses</h1>
      <div className="gallery__images">
        <div className="gallery__images__container">
          <div
            className="wide"
            style={{
              backgroundImage: `url('./media/botrun.webp')`
            }}
          ></div>
          <div
            className="tall"
            style={{
              backgroundImage: "url('./media/director.webp')"
            }}
          ></div>
          <div
            className="big"
            style={{
              backgroundImage: `url('./media/team.webp')`
            }}
          ></div>
          <div
            className="wide"
            style={{ backgroundImage: "url('./media/game.webp')" }}
          ></div>
          <div
            className="tall"
            style={{
              backgroundImage: `url('./media/tabletview.webp')`
            }}
          ></div>
          <div
            className=""
            style={{ backgroundImage: `url('./media/direction.webp')` }}
          ></div>
          <div
            className="wide"
            style={{
              backgroundImage: `url('./media/baymax.webp')`
            }}
          ></div>
          <div
            className=""
            style={{
              backgroundImage: `url('./media/webhead.webp')`
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default PastGlimpse;
