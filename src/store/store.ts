import { configureStore } from "@reduxjs/toolkit";

import detuneSlice from "../Detune/reducer/slice";
import metronomeSlice from "../Metronome/reducer/slice";
import droneSlice from "../Drone/reducer/slice";
import rhythmPracticeSlice from "../RhythmPractice/reducer/slice";

const store = configureStore({
  reducer: { detuneSlice, metronomeSlice, droneSlice, rhythmPracticeSlice },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
