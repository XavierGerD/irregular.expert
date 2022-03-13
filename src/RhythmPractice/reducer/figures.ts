import { getNewBar, getNewTupletBar } from "./barUtils";
import {
  getRandomTimeSig,
  getRandomTupletValue,
  getSelectedRhythmicUnits,
} from "./figuresUtils";
import { IRhythmPracticeState } from "./slice";

export const loadNewImage = (state: IRhythmPracticeState) => {
  const { checkedRhythmicUnits, userInput, bars } = state;
  const { mode, allowEmptyBars } = userInput;
  const isBarMode = mode === "bar";

  const selectedGroups = getSelectedRhythmicUnits(checkedRhythmicUnits);

  if (isBarMode) {
    const newTimeSignatureNumerator = getRandomTimeSig(selectedGroups);
    const newBar = getNewBar(newTimeSignatureNumerator, allowEmptyBars);
    state.bars = bars.slice(1).concat(newBar);
    return;
  }

  const newTupletSize = getRandomTupletValue(selectedGroups);
  const newBar = getNewTupletBar(newTupletSize, allowEmptyBars);

  state.bars = bars.slice(1).concat(newBar);
};
