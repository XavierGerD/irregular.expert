import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";

const getState = (state: RootState) => state.droneSlice;

export const selectPitchValues = createSelector(
  getState,
  (state) => state.detune.pitchValues
);

export const selectTuning = createSelector(
  getState,
  (state) => state.detune.tuning
);
export const selectOctave = createSelector(
  getState,
  (state) => state.detune.octave
);

export const selectEvents = createSelector(
  getState,
  (state) => state.looper.events
);

export const selectTempo = createSelector(
  getState,
  (state) => state.looper.tempo
);

export const selectIsPlaying = createSelector(
  getState,
  (state) => state.looper.isPlaying
);
