import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header>POMODORO CLOCK</header>
      <Timer />
      <button id="reset">⟲</button>
      <div className="timeSelector">
        <p id="break-label">
          BREAK LENGTH:
          <BreakSetter />
        </p>
        <p id="session-label">
          SESSION LENGTH: <SessionSetter />
        </p>
      </div>
    </div>
  );
}

function Timer() {
  const [sessionType, setSessionType] = useState("WORK!"); //state changes to "BREAK" when timer reaches zero.
  const [min, setMin] = useState(25);
  const [sec, setSec] = useState(0);

  function handleStart() {}

  return (
    <div className="Timer">
      <p id="sessionType">{sessionType}</p>
      <h1>
        {min < 10 ? `0${min}` : min}:{sec < 10 ? `0${sec}` : sec}
      </h1>
      <div className="timerButtons">
        <button id="start" onClick={handleStart}>
          ▷
        </button>
        <button id="pause">| |</button>
      </div>
    </div>
  );
}

function BreakSetter() {
  const [breakLength, setBreakLength] = useState(5);
  return (
    <div className="BreakSetter">
      <button className="decrement">-</button>
      {breakLength}
      <button className="increment">+</button>
    </div>
  );
}
function SessionSetter() {
  const [sessionLength, setSessionLength] = useState(25);
  return (
    <div className="SessionSetter">
      <button className="decrement">-</button>
      {sessionLength}
      <button className="increment">+</button>
    </div>
  );
}

export default App;
