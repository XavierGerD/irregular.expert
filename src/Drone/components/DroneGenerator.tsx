import * as React from "react";

import Simple from "../components/Simple/Simple";
import Looper from "../components/Looper/Looper";

import "./DroneGenerator.css";

type Modes = "simple" | "looper";

const DroneGenerator = () => {
  const [mode, setMode] = React.useState<Modes>("simple");

  const handleSimpleTab = () => {
    setMode("simple");
  };

  const handleLooperTab = () => {
    setMode("looper");
  };

  const simpleClassname = "tab " + (mode === "simple" ? "selected" : "");
  const looperClassname = "tab " + (mode === "looper" ? "selected" : "");

  return (
    <div className="drone-container">
      <div className="tab-container">
        <div onClick={handleSimpleTab} className={simpleClassname}>
          Simple
        </div>
        <div onClick={handleLooperTab} className={looperClassname}>
          Looper
        </div>
      </div>

      <div>{mode === "simple" ? <Simple /> : <Looper />}</div>
    </div>
  );
};

export default DroneGenerator;
