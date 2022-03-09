import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";

const getState = (state: RootState) => state.droneSlice;

export const selectPitchValues = createSelector(
  getState,
  (state) => state.pitchValues
);

export const selectTuning = createSelector(getState, (state) => state.tuning);
export const selectOctave = createSelector(getState, (state) => state.octave);
