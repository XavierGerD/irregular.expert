import { PayloadAction } from "@reduxjs/toolkit";
import { IPitchValue, PitchClasses, pitchClassesFromA } from "../../Data";
import { IDroneSubState } from "./slice";

interface ISetTuningPayloadAction {
  tuning: number;
}

export const setTuning = (
  state: IDroneSubState,
  payload: PayloadAction<ISetTuningPayloadAction>
) => {
  const { tuning } = payload.payload;

  const newPitchClasses = pitchClassesFromA.map(
    (pitchClass: PitchClasses, i: number): IPitchValue => ({
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
  console.log({ newPitchClasses });
  state.pitchValues = newPitchClasses;
  state.tuning = tuning;
};
