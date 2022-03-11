import * as React from "react";

import WaveSelector from "../../../common/WaveSelector/WaveSelector";
import LooperEvents from "./LooperEvents";
import LooperEventsAddRemove from "./LooperEventsAddRemove";
import LooperMetronomeInput from "./LooperMetronomeInput";
import { useDispatch } from "react-redux";
import { handleStop, handleStartCountdown } from "../../reducer/slice";
import StartButton from "../../../common/StartButton/StartButton";
import StopButton from "../../../common/StopButton/StopButton";
import Instructions from "../../../common/Instructions/Instructions";
import { instructions } from "./instructions";

import "./Looper.css";

const Looper = () => {
  const dispatch = useDispatch();

  React.useEffect(
    () => () => {
      dispatch(handleStop());
    },
    [dispatch]
  );

  const onStart = React.useCallback(() => {
    dispatch(handleStartCountdown());
  }, [dispatch]);

  const onStop = React.useCallback(() => {
    dispatch(handleStop());
  }, [dispatch]);

  return (
    <div className="drone-container">
      <Instructions instructions={instructions} narrow={true} />
      <div className="looper-container">
        <div className="control-container">
          <LooperEventsAddRemove />
          <LooperMetronomeInput />
        </div>
        <LooperEvents />
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <div>
            <WaveSelector />
            <div
              style={{
                display: "flex",
                marginBottom: "20px",
                justifyContent: "space-around",
                width: "445px",
              }}
            >
              <StartButton onStart={onStart} />
              <StopButton onStop={onStop} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Looper;
