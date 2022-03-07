import * as React from "react";
import { useDispatch } from "react-redux";

import TempoInput from "./TempoInput";
import PlayButton from "./PlayButton";
import StopButton from "./StopButton";
import AdjustVolumeSlider from "./AdjustVolumeSlider";
import { handleStop } from "../reducer/slice";

import "./Metronome.css";

const Metronome = () => {
  const dispatch = useDispatch();
  React.useEffect(
    () => () => {
      dispatch(handleStop);
    },
    [dispatch]
  );

  return (
    <div className="select-container">
      <TempoInput />
      <div className="metronome-buttons-container">
        <PlayButton />
        <StopButton />
      </div>
      <AdjustVolumeSlider />
    </div>
  );
};

export default Metronome;
