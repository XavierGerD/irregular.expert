import { createSlice } from "@reduxjs/toolkit";

import { setGlobalDetune } from "./globalDetune";
import { IPitchValue, PitchClasse, Waveforms } from "../../common/types";
import { setRatioBased } from "./ratios";
import { setDescription } from "./descriptions";
import { setEqualTemperament, setJustTemperament } from "./temperaments";
import {
  setJustTemperamentStartingPitch,
  setMeantoneTemperamentStartingPitch,
  setPythagoreanTemperamentStartingPitch,
} from "./setNotes";

export type NoteColor = "black" | "white";

export type Temperaments = "equal" | "just" | "pythagorean" | "quarterMeantone";
type Descriptions = { [T in Temperaments]: boolean };

export interface IDetuneState {
  octave: number;
  wave: Waveforms;
  currentNote: string;
  pitchValues: IPitchValue[];
  globalDetune: number;
  currentTemperament: Temperaments | undefined;
  showFrequencies: boolean;
  octaveSize: number;
  justTemperamentStartingPitch: PitchClasse;
  pythagoreanTemperamentStartingPitch: PitchClasse;
  meantoneTemperamentStartingPitch: PitchClasse;
  descriptions: Descriptions;
}

const createInitialState = (): IDetuneState => ({
  octave: 4,
  wave: "triangle",
  currentNote: "",
  pitchValues: [],
  globalDetune: 0,
  currentTemperament: undefined,
  showFrequencies: true,
  octaveSize: 12,
  justTemperamentStartingPitch: "C",
  pythagoreanTemperamentStartingPitch: "C",
  meantoneTemperamentStartingPitch: "C",
  descriptions: {
    just: false,
    equal: false,
    pythagorean: false,
    quarterMeantone: false,
  },
});

const detuneSlice = createSlice({
  name: "detune",
  initialState: createInitialState(),
  reducers: {
    setGlobalDetune,
    setRatioBased,
    setDescription,
    setEqualTemperament,
    setJustTemperament,
    setJustTemperamentStartingPitch,
    setMeantoneTemperamentStartingPitch,
    setPythagoreanTemperamentStartingPitch,
  },
});

export const {
  setGlobalDetune: handleGlobalDetune,
  setRatioBased: handleSetRatioBased,
  setDescription: handleSetDescription,
  setEqualTemperament: handleSetEqualTemperament,
  setJustTemperament: handleSetJustTemperament,
  setJustTemperamentStartingPitch: handleSetJustTemperamentStartingPitch,
  setMeantoneTemperamentStartingPitch:
    handleSetMeantoneTemperamentStartingPitch,
  setPythagoreanTemperamentStartingPitch:
    handleSetPythagoreanTemperamentStartingPitch,
} = detuneSlice.actions;

export default detuneSlice.reducer;
