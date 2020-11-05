import React from "react";
import "./BreakSetter.css";

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

export default BreakSetter;
