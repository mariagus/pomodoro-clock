import React, { useState, useEffect } from "react";
import UIfx from "uifx";
import bellAudio from "./bell.mp3";
import "./App.css";
import Timer from "./components/Timer";
import BreakSetter from "./components/BreakSetter";
import SessionSetter from "./components/SessionSetter";

function App() {
  const [sessionType, setSessionType] = useState("WORK!"); //state changes to "BREAK" when timer reaches zero.
  const [min, setMin] = useState(25);
  const [sec, setSec] = useState(0);
  const [breakLength, setBreakLength] = useState(5);
  const [countDown, setCountDown] = useState(false);
  const [sessionLength, setSessionLength] = useState(25);
  const [breakCount, setBreakCount] = useState(false);
  const [rotate, setRotate] = useState(0);
  const [playButton, setPlayButton] = useState(true);
  const bell = new UIfx(bellAudio);

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
      if (breakCount) {
        setSessionType("BREAK!");
      }
      if (countDown) {
        setSessionType("WORK!");
      }
      if (sec === -1 && min > 0) {
        setMin(min - 1);
        setSec(59);
      }
      if (countDown && sec === -1 && min === 0) {
        bell.play();
        setCountDown(false);
        setBreakCount(true);
        setMin(breakLength);
        setSec(0);
      }
      if (breakCount && sec === -1 && min === 0) {
        bell.play();
        setBreakCount(false);
        setCountDown(true);
        setMin(sessionLength);
        setSec(0);
      } else {
        const interval = setInterval(() => {
          setSec(sec - 1);
        }, 1000);
        return () => clearInterval(interval);
      }
    }
  }, [min, sec, countDown, breakCount, sessionLength, breakLength, bell]);

  function handleStart() {
    sessionType === "WORK!" ? setCountDown(true) : setBreakCount(true);
    setPlayButton(false);
  }
  function handlePause() {
    sessionType === "WORK!" ? setCountDown(false) : setBreakCount(false);
    setPlayButton(true);
  }

  return (
    <div className="App">
      <header>POMODORO CLOCK</header>
      <Timer
        playButton={playButton}
        handlePause={handlePause}
        sessionType={sessionType}
        handleStart={handleStart}
        min={min}
        sec={sec}
      />{" "}
      <button
        id="reset"
        onClick={() => {
          setRotate(1);
          setSessionType("WORK!");
          setCountDown(false);
          setBreakCount(false);
          setMin(25);
          setSessionLength(25);
          setBreakLength(5);
          setSec(0);
        }}
        onAnimationEnd={() => setRotate(0)}
        rotate={rotate}
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
        <div className="spacer"></div>
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
      <div className="author">
        designed and coded by{" "}
        <a
          href="https://github.com/mariagus"
          target="__blank"
          className="gitLink"
        >
          Maria Gusova
        </a>
      </div>
    </div>
  );
}

export default App;
