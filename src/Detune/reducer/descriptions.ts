import { PayloadAction } from "@reduxjs/toolkit";
import { IDetuneState, Temperaments } from "./reducer";

interface ISetDescriptionPayloadAction {
  path: Temperaments;
  value: boolean;
}

export const setDescription = (
  state: IDetuneState,
  payload: PayloadAction<ISetDescriptionPayloadAction>,
) => {
  const { value, path } = payload.payload;
  state.descriptions[path] = value;
};
