import * as React from "react";

import "./StopButton.css";

interface IStopButtonProps {
  onStop: () => void;
}

const StopButton = ({ onStop }: IStopButtonProps) => (
  <button id="stop" onClick={onStop}>
    Stop!
  </button>
);

export default StopButton;
