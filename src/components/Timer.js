import React from "react";
import "./Timer.css";

function Timer(props) {
  return (
    <div
      className="Timer"
      style={{
        backgroundColor:
          props.sessionType === "WORK!"
            ? "rgb(245, 115, 76)"
            : "rgb(141, 182, 94)",
      }}
    >
      <p id="sessionType">{props.sessionType}</p>
      <div className="timeDisplay">
        <div className="minutes">
          {" "}
          {props.min < 10 ? `0${props.min}` : props.min}
        </div>
        <div className="colon">:</div>
        <div className="seconds">
          {props.sec < 10 ? `0${props.sec}` : props.sec}
        </div>
      </div>

      <div className="timerButtons">
        {props.playButton === true ? (
          <button id="start" onClick={props.handleStart}>
            ▷
          </button>
        ) : (
          <button id="pause" onClick={props.handlePause}>
            | |
          </button>
        )}
      </div>
    </div>
  );
}

export default Timer;
