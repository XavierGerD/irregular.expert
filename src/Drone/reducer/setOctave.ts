import { PayloadAction } from "@reduxjs/toolkit";
import { IPitchValue } from "../../common/types";
import { IDroneState } from "./slice";

interface ISetOctavePayloadAction {
  octave: number;
}

export const setOctave = (
  state: IDroneState,
  payload: PayloadAction<ISetOctavePayloadAction>
) => {
  const { octave } = payload.payload;
  const { pitchValues, octave: octaveFromState } = state.detune;
  const newPitchValues = pitchValues.map((pitchValue: IPitchValue) => {
    const revertedFrequency =
      pitchValue.frequency / Math.pow(2, octaveFromState);
    const newFrequency = revertedFrequency * Math.pow(2, octave);

    return { ...pitchValue, frequency: newFrequency };
  });

  state.detune.pitchValues = newPitchValues;
  state.detune.octave = octave;
};
