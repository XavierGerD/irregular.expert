import { PayloadAction } from "@reduxjs/toolkit";
import { IDetuneState } from "./slice";
import { IPitchValue } from "../../common/types";

interface IHandleGlobalDetunePayloadAction {
  value: number;
}

const getDetunedFrequency = (baseFrequency: number, detune: number) =>
  baseFrequency * Math.pow(2, detune / 1200);

const getNewPitchValue = (detune: number) => (pitchValue: IPitchValue) => ({
  ...pitchValue,
  frequency: getDetunedFrequency(pitchValue.frequency, detune),
});

export const setGlobalDetune = (
  state: IDetuneState,
  payload: PayloadAction<IHandleGlobalDetunePayloadAction>
) => {
  const { value } = payload.payload;
  if (isNaN(value)) {
    return;
  }

  //cancel previous detune before calculating new one
  const { pitchValues, globalDetune } = state;
  const newPitchValues = pitchValues
    .map(getNewPitchValue(globalDetune * -1))
    .map(getNewPitchValue(value));

  state.globalDetune = value;
  state.pitchValues = newPitchValues;
};
