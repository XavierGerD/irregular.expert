import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { start, stop } from "./play";

interface ISetTempoPayloadAction {
  tempo: number;
}

export interface IMetronomeState {
  tempo: number;
}

const createInitialState = (): IMetronomeState => ({
  tempo: 60,
});

const metronomeSlice = createSlice({
  name: "detune",
  initialState: createInitialState(),
  reducers: {
    start,
    stop,
    setTempo: (
      state: IMetronomeState,
      payload: PayloadAction<ISetTempoPayloadAction>
    ) => {
      state.tempo = payload.payload.tempo;
    },
  },
});

export const {
  start: handleStart,
  stop: handleStop,
  setTempo,
} = metronomeSlice.actions;
export default metronomeSlice.reducer;
