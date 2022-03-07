import { configureStore } from "@reduxjs/toolkit";

import detuneSlice from "../Detune/reducer/slice";
import metronomeSlice from "../Metronome/reducer/slice";

const store = configureStore({
  reducer: { detuneSlice, metronomeSlice },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
