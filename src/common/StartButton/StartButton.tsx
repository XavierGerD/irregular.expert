import * as React from "react";

import "./StartButton.css";

interface IStartButtonProps {
  onStart: () => void;
}

const StartButton = ({ onStart }: IStartButtonProps) => (
  <button id="start" onClick={onStart}>
    Start!
  </button>
);

export default StartButton;
