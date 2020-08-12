import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [sessionType, setSessionType] = useState("WORK!"); //state changes to "BREAK" when timer reaches zero.
  const [min, setMin] = useState(25);
  const [sec, setSec] = useState(0);
  //const [timerRuns, setTimerRuns] = useState(false);
  const [breakLength, setBreakLength] = useState(5);

  const increment = () => setMin(min + 1);
  const decrement = () => setMin(min - 1);
  const incrementBreak = () => setBreakLength(breakLength + 1);
  const decrementBreak = () => setBreakLength(breakLength - 1);
  //useEffect (function(){})
  return (
    <div className="App">
      <header>POMODORO CLOCK</header>
      <Timer sessionType={sessionType} min={min} sec={sec} />{" "}
      <button
        id="reset"
        onClick={() => {
          setMin(25);
          setSec(0);
        }}
      >
        ⟲
      </button>
      <div className="timeSelector">
        <div id="break-label">
          BREAK LENGTH:
          <BreakSetter
            breakLength={breakLength}
            incrementBreak={incrementBreak}
            decrementBreak={decrementBreak}
          />
        </div>
        <div id="session-label">
          SESSION LENGTH:{" "}
          <SessionSetter
            min={min}
            increment={increment}
            decrement={decrement}
          />
        </div>
      </div>
    </div>
  );
}

function Timer(props) {
  return (
    <div className="Timer">
      <p id="sessionType">{props.sessionType}</p>
      <h1>
        {props.min < 10 ? `0${props.min}` : props.min}:
        {props.sec < 10 ? `0${props.sec}` : props.sec}
      </h1>
      <div className="timerButtons">
        <button id="start" onClick={() => console.log("clicked")}>
          ▷
        </button>
        <button id="pause">| |</button>
      </div>
    </div>
  );
}

function BreakSetter(props) {
  //const [breakLength, setBreakLength] = useState(5);
  return (
    <div className="BreakSetter">
      <button
        className="decrement"
        onClick={() => (props.breakLength > 1 ? props.decrementBreak() : null)}
      >
        -
      </button>
      {props.breakLength}
      <button
        className="increment"
        onClick={() => (props.breakLength < 60 ? props.incrementBreak() : null)}
      >
        +
      </button>
    </div>
  );
}
function SessionSetter(props) {
  return (
    <div className="SessionSetter">
      <button
        className="decrement"
        onClick={() => (props.min > 1 ? props.decrement() : null)}
      >
        -
      </button>
      {props.min}
      <button
        className="increment"
        onClick={() => (props.min < 60 ? props.increment() : null)}
      >
        +
      </button>
    </div>
  );
}

export default App;
