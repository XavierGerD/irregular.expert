import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";

const getState = (state: RootState) => state.detuneSlice;

export const selectDescriptions = createSelector(
  getState,
  (state) => state.descriptions,
);

export const selectOctaveSize = createSelector(
  getState,
  (state) => state.octaveSize,
);

export const selectCurrentTemperament = createSelector(
  getState,
  (state) => state.currentTemperament,
);

export const selectJustTemperamentStartingPitch = createSelector(
  getState,
  (state) => state.justTemperamentStartingPitch,
);

export const selectPythagoreanTemperamentStartingPitch = createSelector(
  getState,
  (state) => state.pythagoreanTemperamentStartingPitch,
);

export const selectMeantoneTemperamentStartingPitch = createSelector(
  getState,
  (state) => state.meantoneTemperamentStartingPitch,
);

export const selectPitchValues = createSelector(
  getState,
  (state) => state.pitchValues,
);

export const selectShowFrequencies = createSelector(
  getState,
  (state) => state.showFrequencies,
);

export const selectGlobalDetune = createSelector(
  getState,
  (state) => state.globalDetune,
);

export const selectWave = createSelector(getState, (state) => state.wave);
