import { PayloadAction } from "@reduxjs/toolkit";
import { IPitchValue } from "../../Data";
import { IDroneSubState } from "./slice";

interface ISetOctavePayloadAction {
  octave: number;
}

export const setOctave = (
  state: IDroneSubState,
  payload: PayloadAction<ISetOctavePayloadAction>
) => {
  const { octave } = payload.payload;
  const { pitchValues, octave: octaveFromState, currentNote } = state;
  const newPitchValues = pitchValues.map((pitchValue: IPitchValue) => {
    const revertedFrequency =
      pitchValue.frequency / Math.pow(2, octaveFromState);
    const newFrequency = revertedFrequency * Math.pow(2, octave);

    // if (pitchValue.pitchClass === currentNote) {
    //   this.setNote(event, newFrequency, pitchValue.pitchClass);
    // }
    return { ...pitchValue, frequency: newFrequency };
  });
  state.pitchValues = newPitchValues;
  state.octave = octave;
};
