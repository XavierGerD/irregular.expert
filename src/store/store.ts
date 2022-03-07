import { configureStore } from "@reduxjs/toolkit";
import detuneSlice from "../Detune/reducer/reducer";

const store = configureStore({
  reducer: { detuneSlice },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
