import { TupletValues } from "../../UnicodeAssignment";
import { getNewBar, getNewTupletBar } from "./barUtils";
import {
  getRandomTimeSig,
  getRandomTupletValue,
  getSelectedRhythmicUnits,
} from "./figuresUtils";
import { CheckedRhythmicUnits, IBar, IRhythmPracticeState } from "./slice";

const getAreAnyUnitsSelected = (checkedRhythmicGroups: CheckedRhythmicUnits) =>
  Object.values(checkedRhythmicGroups).some((value: boolean) => value);

export const startExercise = (state: IRhythmPracticeState) => {
  const { phase, userInput, checkedRhythmicUnits } = state;
  const { mode, allowEmptyBars } = userInput;
  const isBarMode = mode === "bar";

  const areAnyUnitsSelected = getAreAnyUnitsSelected(checkedRhythmicUnits);
  const selectedGroups = getSelectedRhythmicUnits(checkedRhythmicUnits);

  if (areAnyUnitsSelected && phase === "stopped") {
    // going through possible time signatures for each of the two displayed bars
    if (isBarMode) {
      const newTimeSignatures = [...new Array(2)].map(() =>
        getRandomTimeSig(selectedGroups)
      );

      const newBars = newTimeSignatures.map(
        (newTimeSignatureNumerator): IBar =>
          getNewBar(newTimeSignatureNumerator, allowEmptyBars)
      );

      state.bars = newBars;
    } else {
      const newTupletSizes = [...new Array(2)].map(
        () => getRandomTupletValue(selectedGroups) as TupletValues
      );

      const newBars = newTupletSizes.map(
        (newTimeSignatureNumerator): IBar =>
          getNewTupletBar(newTimeSignatureNumerator, allowEmptyBars)
      );

      state.bars = newBars;
    }
    //start countdown, update state
    // this.countDown();
  }

  state.phase = "countdown";
};
