import { createSlice } from "@reduxjs/toolkit";

import { setTuning } from "./setTuning";
import { setOctave } from "./setOctave";
import { startCountdown, stop, setTempo } from "./play";
import { changeBeat, changeNote, addEvent, removeEvent } from "./events";
import { IPitchValue, IRhythmicEvent } from "../../common/types";

export interface ISimpleSubState {
  octave: number;
  tuning: number;
  pitchValues: IPitchValue[];
}

export interface ILooperSubState {
  events: IRhythmicEvent[];
  tempo: number;
  isPlaying: boolean;
}

export interface IDroneState {
  detune: ISimpleSubState;
  looper: ILooperSubState;
}

const createInitialState = (): IDroneState => ({
  detune: {
    octave: 4,
    tuning: 440,
    pitchValues: [],
  },
  looper: {
    events: [],
    tempo: 60,
    isPlaying: false,
  },
});

const droneSlice = createSlice({
  name: "drone",
  initialState: createInitialState(),
  reducers: {
    addEvent,
    removeEvent,
    changeBeat,
    changeNote,
    setOctave,
    setTuning,
    startCountdown,
    stop,
    setTempo,
  },
});

export const {
  addEvent: handleAddEvent,
  removeEvent: handleRemoveEvent,
  changeBeat: handleBeatChange,
  changeNote: handleNoteChange,
  setOctave: handleSetOctave,
  setTuning: handleSetTuning,
  startCountdown: handleStartCountdown,
  stop: handleStop,
  setTempo: handleSetTempo,
} = droneSlice.actions;

export default droneSlice.reducer;
