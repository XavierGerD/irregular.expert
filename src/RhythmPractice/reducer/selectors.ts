import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";
import { TupletValues } from "../../UnicodeAssignment";
import { RhythmicUnitKeys } from "../RhythmicUnits";

const _selectData = (state: RootState) => state.rhythmPracticeSlice;
const _selectUserInput = createSelector(_selectData, (data) => data.userInput);
const withIndexSelector = (state: RootState, index: number) => index;

export const selectRhythmicEvents = createSelector(
  _selectData,
  withIndexSelector,
  (data, index) => data.bars[index].rhythmicEvents
);

export const selectTimeSignature = createSelector(
  _selectData,
  withIndexSelector,
  (data, index) => data.bars[index].timeSignature
);

export const selectMode = createSelector(
  _selectUserInput,
  (userInput) => userInput.mode
);

export const selectPlayAnswer = createSelector(
  _selectUserInput,
  (userInput) => userInput.playAnswer
);

export const selectAllowEmptyBars = createSelector(
  _selectUserInput,
  (userInput) => userInput.allowEmptyBars
);

export const selectPlayEveryEighth = createSelector(
  _selectUserInput,
  (userInput) => userInput.playEveryEighth
);

export const selectReps = createSelector(
  _selectUserInput,
  (userInput) => userInput.repInput
);

export const selectTempo = createSelector(
  _selectUserInput,
  (userInput) => userInput.tempoInput
);

export const selectIsBarMode = createSelector(
  selectMode,
  (mode) => mode === "bar"
);

export const selectHasStarted = createSelector(
  _selectData,
  (data) => data.phase !== "stopped"
);

export const selectIsRhythmicUnitChecked = createSelector(
  _selectData,
  (state: RootState, key: RhythmicUnitKeys) => key,
  (data, key) => data.checkedRhythmicUnits[key]
);

export const selectIsTupletValueChecked = createSelector(
  _selectData,
  (state: RootState, key: TupletValues) => key,
  (data, key) => data.checkedTupletValues[key]
);
