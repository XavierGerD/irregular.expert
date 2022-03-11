import { PayloadAction } from "@reduxjs/toolkit";
import {
  IPitchValue,
  PitchClasse,
  pitchClassesFromA,
} from "../../common/types";
import { IDroneState } from "./slice";

interface ISetTuningPayloadAction {
  tuning: number;
}

export const setTuning = (
  state: IDroneState,
  payload: PayloadAction<ISetTuningPayloadAction>
) => {
  const { tuning } = payload.payload;

  const newPitchClasses = pitchClassesFromA.map(
    (pitchClass: PitchClasse, i: number): IPitchValue => ({
      octave: 4,
      pitchClass,
      frequency: (tuning * Math.pow(2, i / 12)) / 2,
      ratio: undefined,
    })
  );

  newPitchClasses.push({
    pitchClass: "A",
    frequency: tuning,
    ratio: undefined,
    octave: 5,
  });

  state.detune.pitchValues = newPitchClasses;
  state.detune.tuning = tuning;
};
