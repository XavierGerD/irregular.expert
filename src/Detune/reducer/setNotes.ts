import { PayloadAction } from "@reduxjs/toolkit";
import { PitchClasses } from "../../Data";
import { IDetuneState } from "./reducer";

interface ISetTemperamentStartingPitchPayloadAction {
  tonic: PitchClasses;
}

export const setPythagoreanTemperamentStartingPitch = (
  state: IDetuneState,
  payload: PayloadAction<ISetTemperamentStartingPitchPayloadAction>,
) => {
  state.pythagoreanTemperamentStartingPitch = payload.payload.tonic;
};

export const setMeantoneTemperamentStartingPitch = (
  state: IDetuneState,
  payload: PayloadAction<ISetTemperamentStartingPitchPayloadAction>,
) => {
  state.meantoneTemperamentStartingPitch = payload.payload.tonic;
};

export const setJustTemperamentStartingPitch = (
  state: IDetuneState,
  payload: PayloadAction<ISetTemperamentStartingPitchPayloadAction>,
) => {
  state.justTemperamentStartingPitch = payload.payload.tonic;
};
