import { PayloadAction } from "@reduxjs/toolkit";
import { PitchClasse } from "../../common/types";
import { IDetuneState } from "./slice";

interface ISetTemperamentStartingPitchPayloadAction {
  tonic: PitchClasse;
}

export const setPythagoreanTemperamentStartingPitch = (
  state: IDetuneState,
  payload: PayloadAction<ISetTemperamentStartingPitchPayloadAction>
) => {
  state.pythagoreanTemperamentStartingPitch = payload.payload.tonic;
};

export const setMeantoneTemperamentStartingPitch = (
  state: IDetuneState,
  payload: PayloadAction<ISetTemperamentStartingPitchPayloadAction>
) => {
  state.meantoneTemperamentStartingPitch = payload.payload.tonic;
};

export const setJustTemperamentStartingPitch = (
  state: IDetuneState,
  payload: PayloadAction<ISetTemperamentStartingPitchPayloadAction>
) => {
  state.justTemperamentStartingPitch = payload.payload.tonic;
};
