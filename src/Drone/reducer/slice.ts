import { createSlice } from "@reduxjs/toolkit";

import { setTuning } from "./setTuning";
import { setOctave } from "./setOctave";
import { IPitchValue, Waveforms } from "../../Data";

export interface IDroneSubState {
  octave: number;
  wave: Waveforms;
  currentNote: string;
  tuning: number;
  pitchValues: IPitchValue[];
}

const createInitialState = (): IDroneSubState => ({
  octave: 4,
  wave: "triangle",
  currentNote: "",
  tuning: 440,
  pitchValues: [],
});

const droneSlice = createSlice({
  name: "drone",
  initialState: createInitialState(),
  reducers: { setTuning, setOctave },
});

export const { setTuning: handleSetTuning, setOctave: handleSetOctave } =
  droneSlice.actions;

export default droneSlice.reducer;
