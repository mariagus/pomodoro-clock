import React, { useState, useEffect } from "react";
import UIfx from "uifx";
import bellAudio from "./bell.mp3";
import "./App.css";

function App() {
  const [sessionType, setSessionType] = useState("WORK!"); //state changes to "BREAK" when timer reaches zero.
  const [min, setMin] = useState(25);
  const [mins, setMins] = useState(25);
  const [sec, setSec] = useState(0);
  const [breakLength, setBreakLength] = useState(5);
  const [countDown, setCountDown] = useState(false);

  const increment = () => {
    setMin(mins);
    setSec(0);
    if (mins === min) {
      setMins(mins + 1);
      setMin(min + 1);
    }
  };
  const decrement = () => {
    setMin(mins);
    setSec(0);
    if (mins === min) {
      setMins(mins - 1);
      setMin(min - 1);
    }
  };

  const bell = new UIfx(bellAudio);
  const incrementBreak = () => setBreakLength(breakLength + 1);
  const decrementBreak = () => setBreakLength(breakLength - 1);

  useEffect(() => {
    if (countDown) {
      if (sec === -1 && min > 0) {
        setSec(59);
        setMin(min - 1);
      }
      const interval = setInterval(() => {
        if (sec === -1 && min === 0) {
          clearInterval(interval);
          interval();
        }
        if (sec === 0 && min === 0) {
          setCountDown(false);
          bell.play();
          return () => clearInterval(interval);
        }
        setSec(sec - 1);
      }, 500);
      return () => clearInterval(interval);
    }
  }, [min, sec, countDown, breakLength, bell]);

  function handleStart() {
    setCountDown(true);
  }
  function handlePause() {
    setCountDown(false);
  }

  return (
    <div className="App">
      <header>POMODORO CLOCK</header>
      <Timer
        handlePause={handlePause}
        sessionType={sessionType}
        handleStart={handleStart}
        min={min}
        sec={sec}
      />{" "}
      <button
        id="reset"
        onClick={() => {
          setCountDown(false);
          setMin(25);
          setMins(25);
          setBreakLength(5);
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
            countDown={countDown}
            mins={mins}
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
        <button id="start" onClick={props.handleStart}>
          ▷
        </button>
        <button id="pause" onClick={props.handlePause}>
          | |
        </button>
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
        onClick={() =>
          props.mins > 1 && props.countDown === false ? props.decrement() : null
        }
      >
        -
      </button>
      {props.mins}
      <button
        className="increment"
        onClick={() =>
          props.mins < 60 && props.countDown === false
            ? props.increment()
            : null
        }
      >
        +
      </button>
    </div>
  );
}

export default App;
