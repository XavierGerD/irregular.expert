import { PayloadAction } from "@reduxjs/toolkit";
import { Pitch } from "../../common/types";

import { IDroneState } from "./slice";

export const addEvent = (state: IDroneState) => {
  const { events } = state.looper;
  if (events.length < 4) {
    const newEvents = events.concat([
      { note: "C4", beats: 4, position: events.length },
    ]);
    state.looper.events = newEvents;
  }
};

export const removeEvent = (state: IDroneState) => {
  const { events } = state.looper;
  const newEvents = events.slice(0, events.length - 1);
  state.looper.events = newEvents;
};

interface IChangeBeatPayloadAction {
  index: number;
  value: number;
}

export const changeBeat = (
  state: IDroneState,
  payload: PayloadAction<IChangeBeatPayloadAction>
) => {
  const { events } = state.looper;
  const { index, value } = payload.payload;
  const event = { ...events[index] };
  event.beats = value;
  const newEvents = [...events];
  newEvents.splice(index, 1, event);
  state.looper.events = newEvents;
};

interface IChangeNotePayloadAction {
  index: number;
  value: Pitch;
}

export const changeNote = (
  state: IDroneState,
  payload: PayloadAction<IChangeNotePayloadAction>
) => {
  const { events } = state.looper;
  const { index, value } = payload.payload;
  const event = { ...events[index] };
  event.note = value;
  const newEvents = [...events];
  newEvents.splice(index, 1, event);
  state.looper.events = newEvents;
};
