import { blip01, blip02, clap, countdownSound } from "../../Audio";
import store from "../../store/store";
import { loadNewImage, setPhase } from "./slice";

let playAndCountFrame: number;
let countDownFrame: number;

let repCount = 0;
let subdivisionCount = 0;
let eventCount = 0;

export const countDown =
  (lastClick: number, clickInterval: number) => (time: number) => {
    if (time - lastClick > clickInterval) {
      if (repCount > 3) {
        repCount = 0;
        store.dispatch(setPhase("firstFigure"));
        requestAnimationFrame(playAndCount(0));
        return;
      }

      countdownSound.play();

      repCount++;
      countDownFrame = requestAnimationFrame(countDown(time, clickInterval));
      return;
    }
    countDownFrame = requestAnimationFrame(countDown(lastClick, clickInterval));
  };

const playAndCount = (lastClick: number) => (time: number) => {
  const { userInput, bars, phase } = store.getState().rhythmPracticeSlice;
  const { mode, tempoInput, playEveryEighth, playAnswer, repInput } = userInput;
  const isBarMode = mode === "bar";

  const currentBar = bars[0];
  if (!currentBar) {
    return;
  }

  const { timeSignature, rhythmicEvents } = currentBar;
  const divider = isBarMode ? 2 : timeSignature;
  const newClickInterval = 60000 / tempoInput / divider;

  if (time - lastClick > newClickInterval) {
    if (repCount === 0 && phase === "play") {
      //load new image and ensure a new one isn't loaded right after
      store.dispatch(loadNewImage());
      store.dispatch(setPhase("firstFigure"));
    }

    if (currentBar.type === "bar") {
      const { subdivisions } = currentBar;
      const currentSubdivision = subdivisions[subdivisionCount];
      eventCount === 0 ? blip02.play() : playEveryEighth && blip01.play();

      if (playAnswer) {
        if (rhythmicEvents[subdivisionCount][eventCount] === 1) {
          clap.play();
        }
      }

      eventCount++;
      if (eventCount === currentSubdivision) {
        eventCount = 0;
        subdivisionCount++;
      }

      if (subdivisionCount === subdivisions.length) {
        // increase the repcount and reset subdivision counter
        repCount++;
        eventCount = 0;
        subdivisionCount = 0;
      }
    } else {
      const { subdivisions } = currentBar;
      subdivisionCount === 0 ? blip02.play() : playEveryEighth && blip01.play();

      if (playAnswer) {
        if (rhythmicEvents[0][subdivisionCount] === 1) {
          clap.play();
        }
      }
      subdivisionCount++;

      if (subdivisionCount === subdivisions) {
        // increase the repcount and reset subdivision counter
        repCount++;
        eventCount = 0;
        subdivisionCount = 0;
      }
    }

    if (repCount === repInput) {
      repCount = 0;
      if (phase === "firstFigure") {
        store.dispatch(setPhase("play"));
      }
    }

    playAndCountFrame = requestAnimationFrame(playAndCount(time));

    // this.setState({ repCount, lastBeat, subdivisionCount });
    return;
  }
  playAndCountFrame = requestAnimationFrame(playAndCount(lastClick));
};

export const resetExercise = () => {
  cancelAnimationFrame(playAndCountFrame);
  cancelAnimationFrame(countDownFrame);
  playAndCountFrame = 0;
  countDownFrame = 0;
  repCount = 0;
  eventCount = 0;
  subdivisionCount = 0;
};
