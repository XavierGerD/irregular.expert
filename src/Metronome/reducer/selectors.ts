import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";

const getState = (state: RootState) => state.metronomeSlice;

export const getTempo = createSelector(getState, (state) => state.tempo);
