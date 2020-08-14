import React, { useState, useEffect } from "react";
import UIfx from "uifx";
import bellAudio from "./bell.mp3";
import "./App.css";

function App() {
  const [sessionType, setSessionType] = useState("WORK!"); //state changes to "BREAK" when timer reaches zero.
  const [min, setMin] = useState(25);
  const [sec, setSec] = useState(0);
  const [breakLength, setBreakLength] = useState(5);
  const [countDown, setCountDown] = useState(false);
  const [sessionLength, setSessionLength] = useState(25);
  const [breakCount, setBreakCount] = useState(false);

  const increment = () => {
    if (sessionType === "WORK!") {
      setMin(sessionLength);
      setSec(0);
      if (sessionLength === min) {
        setSessionLength(sessionLength + 1);
        setMin(min + 1);
      }
    } else {
      setSessionLength(sessionLength + 1);
    }
  };
  const decrement = () => {
    if (sessionType === "WORK!") {
      setMin(sessionLength);
      setSec(0);
      if (sessionLength === min) {
        setSessionLength(sessionLength - 1);
        setMin(min - 1);
      }
    } else {
      setSessionLength(sessionLength - 1);
    }
  };

  const bell = new UIfx(bellAudio);
  const incrementBreak = () => {
    if (sessionType === "BREAK!") {
      setMin(breakLength);
      setSec(0);
      if (breakLength === min) {
        setBreakLength(breakLength + 1);
        setMin(min + 1);
      }
    } else {
      setBreakLength(breakLength + 1);
    }
  };

  const decrementBreak = () => {
    if (sessionType === "BREAK!") {
      setMin(breakLength);
      setSec(0);
      if (breakLength === min) {
        setBreakLength(breakLength - 1);
        setMin(min - 1);
      }
    } else {
      setBreakLength(breakLength - 1);
    }
  };

  useEffect(() => {
    if (countDown || breakCount) {
      if (sec === -1 && min > 0) {
        setSec(59);
        setMin(min - 1);
      }
      const interval = setInterval(() => {
        if (sec === -1 && min === 0) {
          clearInterval(interval);
          interval();
        }
        if (countDown && sec === 0 && min === 0) {
          setCountDown(false);
          setBreakCount(true);
          setSessionType("BREAK!");
          bell.play();
          setMin(breakLength);
          setSec(0);
        }
        if (breakCount && sec === 0 && min === 0) {
          setBreakCount(false);
          bell.play();
          return () => clearInterval(interval);
        }
        setSec(sec - 1);
      }, 200);

      return () => clearInterval(interval);
    }
  }, [min, sec, countDown, breakCount, breakLength, bell]);

  function handleStart() {
    sessionType === "WORK!" ? setCountDown(true) : setBreakCount(true);
  }
  function handlePause() {
    sessionType === "WORK!" ? setCountDown(false) : setBreakCount(false);
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
          setSessionType("WORK!");
          setCountDown(false);
          setBreakCount(false);
          setMin(25);
          setSessionLength(25);
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
            mins={sessionLength}
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
