import * as React from "react";
import { useDispatch } from "react-redux";

import { handleStartExercise } from "../reducer/slice";
import { instructions as genericInstructions } from "../instructions";
import AllowEmptyBarsInput from "./Inputs/AllowEmptyBarsInput";
import Bars from "./Bars";
import GenericInstructions from "../../common/Instructions/Instructions";
import Instructions from "./Instructions";
import ModeSelector from "./Inputs/ModeSelector";
import PlaybackAnswerInput from "./Inputs/PlaybackAnswerInput";
import PlayEveryEighthInput from "./Inputs/PlayEveryEighthInput";
import RepsInput from "./Inputs/RepsInput";
import StaffLine from "./StaffLine";
import StartButton from "../../common/StartButton/StartButton";
import TempoInput from "./Inputs/TempoInput";
import ValueSelectors from "./ValueSelectors";

import "./RhythmPractice.css";

const RhythmPractice = () => {
  const dispatch = useDispatch();
  //   componentWillUnmount = () => {
  //     this.stopExercise();
  //   };

  //   const playAndCount = () => {
  //     let now = new Date() / 1;
  //     let clickInterval;
  //     let repCount = this.state.repCount;
  //     let subdivisionCount = this.state.subdivisionCount;
  //     let divider;
  //     let unevenBeat = false;
  //     if (this.state.mode === "bar") {
  //       // set an event every subdivision of the pulse
  //       divider = 2;
  //       unevenBeat = subdivisionCount % 2 === 1;
  //       // console.log("uneven beat?", unevenBeat);
  //     } else if (this.state.mode === "tuplet") {
  //       //divide whole bar by the time signature
  //       divider = this.state.timeSignatures[0];
  //     }
  //     // set the frequency of each potential click
  //     clickInterval = 60000 / parseInt(this.state.tempoInput) / divider;
  //     if (now - this.state.lastBeat > clickInterval) {
  //       if (this.state.repCount === 1 && this.state.phase === "play") {
  //         //load new image and ensure a new one isn't loaded right after
  //         this.loadNewImage();
  //         this.setState({ phase: "firstFigure" });
  //       }

  //       if (!this.state.playEveryEighth && this.state.timeSignatures[0] === 6) {
  //         if (subdivisionCount === 1) {
  //           blip02.play();
  //         } else if (subdivisionCount === 4) {
  //           blip01.play();
  //         }
  //       } else if (!this.state.playEveryEighth && unevenBeat) {
  //         // play only a click on uneven beats (strong beats)
  //         if (subdivisionCount === 1) {
  //           blip02.play();
  //         } else {
  //           blip01.play();
  //         }
  //       } else if (!this.state.playEveryEighth && this.state.mode === "tuplet") {
  //         // play only a click on the first beat of the bar
  //         if (subdivisionCount === 1) {
  //           blip02.play();
  //         }
  //       } else if (this.state.playEveryEighth) {
  //         // play a click on every subdivision
  //         if (subdivisionCount === 1) {
  //           blip02.play();
  //         } else {
  //           blip01.play();
  //         }
  //       }

  //       if (this.state.playAnswer) {
  //         if (this.state.binaryFigures[0][subdivisionCount - 1] === 1) {
  //           clap.play();
  //         }
  //       }

  //       subdivisionCount++;
  //       if (subdivisionCount > this.state.timeSignatures[0]) {
  //         // increase the repcount and reset subdivision counter
  //         repCount++;
  //         subdivisionCount = 1;
  //       }
  //       if (repCount > parseInt(this.state.repInput)) {
  //         //reset repcount and prepare to load new image at next loop
  //         // console.log("resetting repcount!");
  //         repCount = 1;
  //         if (this.state.phase === "firstFigure") {
  //           this.setState({ phase: "play" });
  //         }
  //       }
  //       this.playAndCountFrame = requestAnimationFrame(this.playAndCount);
  //       let lastBeat = new Date() / 1;
  //       this.setState({ repCount, lastBeat, subdivisionCount });
  //       return;
  //     }
  //     this.playAndCountFrame = requestAnimationFrame(this.playAndCount);
  //   };

  //   const countDown = () => {
  //     //if countdown is already done, return
  //     if (this.state.countDownCheck) return;
  //     //set the current date to check if enough time has passed
  //     let now = new Date() / 1;
  //     //number of clicks per minute
  //     let clickInterval = 60000 / parseInt(this.state.tempoInput);
  //     if (now - this.state.lastBeat > clickInterval) {
  //       let repCount = this.state.repCount;
  //       if (repCount > 4) {
  //         //if the 4 beat countdown is over, reset repcount and start the exercise
  //         repCount = 1;
  //         let countDownCheck = true;
  //         this.setState({
  //           repCount,
  //           countDownCheck,
  //           phase: "firstFigure",
  //         });
  //         this.playAndCount();
  //         return;
  //       }
  //       countdownSound.play();

  //       repCount++;
  //       // if the coundown isn't over, set the time of the last beat and call the function again
  //       let lastBeat = new Date() / 1;
  //       this.countDownFrame = requestAnimationFrame(this.countDown);
  //       this.setState({ repCount, lastBeat });
  //       return;
  //     }
  //     this.countDownFrame = requestAnimationFrame(this.countDown);
  //   };

  //   const stopExercise = () => {
  //     cancelAnimationFrame(this.countDownFrame);
  //     cancelAnimationFrame(this.playAndCountFrame);
  //     this.setState({
  //       timeSignatures: [0, 0],
  //       binaryFigures: [],
  //       displayedFigures: [],
  //       displayedTuplets: [],
  //       started: false,
  //       repCount: 1,
  //       subdivisionCount: 1,
  //       countDownCheck: false,
  //       phase: "countdown",
  //     });
  //   };

  const startExercise = React.useCallback(
    () => dispatch(handleStartExercise()),
    [dispatch]
  );

  return (
    <div className="rhythmContainer">
      <div className="instructions">
        <div style={{ width: "1000px" }}>
          <GenericInstructions instructions={genericInstructions} />
        </div>
      </div>
      <div className="rhythmContainer">
        <div className="rp-controlpanel">
          <div className="rp-panelsection">
            <TempoInput />
            <RepsInput />
            <ValueSelectors />
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
        <StartButton onStart={startExercise} />
        {/* <StopButton onStop={stopExercise} /> */}
      </div>
      <Instructions />
    </div>
  );
};

export default RhythmPractice;
