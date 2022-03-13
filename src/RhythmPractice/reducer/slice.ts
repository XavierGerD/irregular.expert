import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RhythmicUnitKeys } from "../RhythmicUnits";
import { startExercise } from "./play";

// A rhythmic event is a note or a rest for a given beat.
export type RhythmicEvent = 0 | 1;
// A rhythmic subdivision is the amount of events that are grouped together
export type RhythmicSubdivision = 2 | 3;
// A rhythmic unit is a bar or a tuplet
export type RhythmicUnit = RhythmicSubdivision[];

export interface IRhythmPracticeState {
  countDownCheck: boolean;
  phase: RhythmPracticePhases;
  repCount: number;
  bars: IBar[];
  checkedRhythmicUnits: CheckedRhythmicUnits;
  subdivisionCount: number;
  userInput: IUserInput;
}

export interface IBar {
  rhythmicEvents: RhythmicEvent[][];
  timeSignature: number;
}

export type RhythmPracticeModes = "bar" | "tuplet";
type RhythmPracticePhases = "stopped" | "countdown" | "firstFigure" | "play";

interface IUserInput {
  allowEmptyBars: boolean;
  mode: RhythmPracticeModes;
  playAnswer: boolean;
  playEveryEighth: boolean;
  repInput: number;
  tempoInput: number;
}

export type CheckedRhythmicUnits = { [key in RhythmicUnitKeys]: boolean };

const createInitialState = (): IRhythmPracticeState => ({
  countDownCheck: false,
  phase: "stopped",
  repCount: 1,
  bars: [],
  subdivisionCount: 1,
  checkedRhythmicUnits: {
    three: true,
    four: false,
    five_1: false,
    six: false,
    seven_1: false,
    eight: false,
  },
  userInput: {
    allowEmptyBars: false,
    mode: "bar",
    playAnswer: false,
    playEveryEighth: false,
    repInput: 4,
    tempoInput: 60,
  },
});

interface ISetCheckedRhythmicGroupActionPayload {
  path: RhythmicUnitKeys;
  value: boolean;
}

const rhythmPracticeSlice = createSlice({
  name: "rhythmPractice",
  initialState: createInitialState(),
  reducers: {
    startExercise,
    setPlayAnswer: (state, action: PayloadAction<boolean>) => {
      state.userInput.playAnswer = action.payload;
    },
    setMode: (state, action: PayloadAction<RhythmPracticeModes>) => {
      state.userInput.mode = action.payload;
    },
    setAllowEmptyBars: (state, action: PayloadAction<boolean>) => {
      state.userInput.allowEmptyBars = action.payload;
    },
    setPlayEveryEighth: (state, action: PayloadAction<boolean>) => {
      state.userInput.playEveryEighth = action.payload;
    },
    setRepInput: (state, action: PayloadAction<number>) => {
      state.userInput.repInput = action.payload;
    },
    setTempo: (state, action: PayloadAction<number>) => {
      state.userInput.tempoInput = action.payload;
    },
    setCheckedRhythmicGroup: (
      state,
      action: PayloadAction<ISetCheckedRhythmicGroupActionPayload>
    ) => {
      state.checkedRhythmicUnits[action.payload.path] = action.payload.value;
    },
    stopExercise: (state) => {
      state.bars = [];
      state.repCount = 1;
      state.phase = "stopped";
      state.countDownCheck = false;
      state.subdivisionCount = 1;
    },
  },
});

export const {
  startExercise: handleStartExercise,
  setAllowEmptyBars,
  setMode,
  setPlayAnswer,
  setPlayEveryEighth,
  setRepInput,
  setTempo,
  setCheckedRhythmicGroup,
  stopExercise,
} = rhythmPracticeSlice.actions;

export default rhythmPracticeSlice.reducer;
