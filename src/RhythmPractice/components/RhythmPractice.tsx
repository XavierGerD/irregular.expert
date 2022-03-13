import * as React from "react";
import { useDispatch, useSelector } from "react-redux";

import { handleStartExercise, stopExercise } from "../reducer/slice";
import { instructions as genericInstructions } from "../instructions";
import AllowEmptyBarsInput from "./Inputs/AllowEmptyBarsInput";
import Bars from "./Bars/Bars";
import GenericInstructions from "../../common/Instructions/Instructions";
import Instructions from "./Instructions";
import ModeSelector from "./Inputs/ModeSelector";
import PlaybackAnswerInput from "./Inputs/PlaybackAnswerInput";
import PlayEveryEighthInput from "./Inputs/PlayEveryEighthInput";
import RepsInput from "./Inputs/RepsInput";
import StaffLine from "./Bars/StaffLine";
import StartButton from "../../common/StartButton/StartButton";
import TempoInput from "./Inputs/TempoInput";
import ValueSelectors from "./ValueSelectors";
import StopButton from "../../common/StopButton/StopButton";
import { countDown, resetExercise } from "../reducer/play";
import { selectTempo } from "../reducer/selectors";

import "./RhythmPractice.css";

const RhythmPractice = () => {
  const dispatch = useDispatch();
  const tempo = useSelector(selectTempo);
  React.useEffect(
    () => () => {
      dispatch(stopExercise());
    },
    [dispatch]
  );

  const start = React.useCallback(() => {
    dispatch(handleStartExercise());
    const clickInterval = 60000 / tempo;
    requestAnimationFrame(countDown(0, clickInterval));
  }, [dispatch, tempo]);

  const stop = React.useCallback(() => {
    dispatch(stopExercise());
    resetExercise();
  }, [dispatch]);

  return (
    <div className="rhythmContainer">
      <div className="instructions">
        <div style={{ width: "1000px" }}>
          <GenericInstructions instructions={genericInstructions} />
        </div>
      </div>
      <div className="rhythmContainer">
        <div className="rp-controlpanel">
          <ValueSelectors />
          <div className="rp-panelsection">
            <TempoInput />
            <RepsInput />
          </div>
          <div style={{ marginLeft: "20px" }} className="rp-panelsection">
            <ModeSelector />
            <PlayEveryEighthInput />
            <AllowEmptyBarsInput />
            <PlaybackAnswerInput />
          </div>
        </div>
      </div>
      <div className="main-practice-container">
        <div className="practiceMain">
          <StaffLine />
          <Bars />
        </div>
      </div>
      <div className="start-stop-container">
        <StartButton onStart={start} />
        <StopButton onStop={stop} />
      </div>
      <Instructions />
    </div>
  );
};

export default RhythmPractice;
