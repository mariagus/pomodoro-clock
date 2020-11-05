import React from "react";
import "./SessionSetter.css";

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

export default SessionSetter;
