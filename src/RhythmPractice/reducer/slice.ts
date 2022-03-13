import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { tupletCodes, TupletValues } from "../../UnicodeAssignment";

import { rhythmicUnitKeys, RhythmicUnitKeys } from "../RhythmicUnits";
import { getNewBars, getNewTupletBars } from "./barUtils";
import {
  getSelectedRhythmicUnits,
  getSelectedTupletValues,
} from "./figuresUtils";

// A rhythmic event is a note or a rest for a given beat.
export type RhythmicEvent = 0 | 1;
// A rhythmic subdivision is the amount of events that are grouped together
export type RhythmicSubdivision = 2 | 3;
// A rhythmic unit is a bar or a tuplet
export type RhythmicUnit = RhythmicSubdivision[];

export interface IRhythmPracticeState {
  phase: RhythmPracticePhases;
  bars: (IBar | ITuplet)[];
  checkedRhythmicUnits: CheckedRhythmicUnits;
  checkedTupletValues: CheckedTupletValues;
  userInput: IUserInput;
}

interface IRhythmicEvents {
  rhythmicEvents: RhythmicEvent[][];
  timeSignature: number;
}

export interface IBar extends IRhythmicEvents {
  type: "bar";
  subdivisions: RhythmicUnit;
}
export interface ITuplet extends IRhythmicEvents {
  type: "tuplet";
  subdivisions: TupletValues;
}

export type RhythmPracticeModes = "bar" | "tuplet";
export type RhythmPracticePhases =
  | "stopped"
  | "countdown"
  | "firstFigure"
  | "play";

interface IUserInput {
  allowEmptyBars: boolean;
  mode: RhythmPracticeModes;
  playAnswer: boolean;
  playEveryEighth: boolean;
  repInput: number;
  tempoInput: number;
}

export type CheckedRhythmicUnits = { [key in RhythmicUnitKeys]: boolean };
export type CheckedTupletValues = { [key in TupletValues]: boolean };

const getCheckedRhythmicUnits = (): CheckedRhythmicUnits => {
  const mapped = new Map<RhythmicUnitKeys, boolean>(
    rhythmicUnitKeys.map((key: RhythmicUnitKeys, index: number) => [
      key,
      index === 0 ? true : false,
    ])
  );

  return Object.fromEntries(mapped) as CheckedRhythmicUnits;
};

const getCheckedTupletValues = (): CheckedTupletValues => {
  const mapped = new Map<TupletValues, boolean>(
    Object.keys(tupletCodes).map((key: string, index: number) => [
      parseInt(key) as TupletValues,
      index === 0 ? true : false,
    ])
  );

  return Object.fromEntries(mapped) as CheckedTupletValues;
};

const createInitialState = (): IRhythmPracticeState => ({
  phase: "stopped",
  bars: [],
  checkedRhythmicUnits: getCheckedRhythmicUnits(),
  checkedTupletValues: getCheckedTupletValues(),
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

interface ISetCheckedTupletValueActionPayload {
  path: TupletValues;
  value: boolean;
}

const getAreAnyUnitsSelected = (
  checkedRhythmicGroups: CheckedRhythmicUnits | CheckedTupletValues
) => Object.values(checkedRhythmicGroups).some((value: boolean) => value);

const rhythmPracticeSlice = createSlice({
  name: "rhythmPractice",
  initialState: createInitialState(),
  reducers: {
    startExercise: (state) => {
      const { phase, userInput, checkedRhythmicUnits, checkedTupletValues } =
        state;
      const { mode, allowEmptyBars } = userInput;
      const isBarMode = mode === "bar";

      const checkedGroups = isBarMode
        ? checkedRhythmicUnits
        : checkedTupletValues;

      const areAnyUnitsSelected = getAreAnyUnitsSelected(checkedGroups);

      if (areAnyUnitsSelected && phase === "stopped") {
        const newBars = isBarMode
          ? getNewBars(
              2,
              getSelectedRhythmicUnits(checkedRhythmicUnits),
              allowEmptyBars
            )
          : getNewTupletBars(
              2,
              getSelectedTupletValues(checkedTupletValues),
              allowEmptyBars
            );

        state.bars = newBars;
        state.phase = "countdown";
      }
    },
    loadNewImage: (state) => {
      const { checkedRhythmicUnits, userInput, bars, checkedTupletValues } =
        state;
      const { mode, allowEmptyBars } = userInput;
      const isBarMode = mode === "bar";

      const newBar = isBarMode
        ? getNewBars(
            1,
            getSelectedRhythmicUnits(checkedRhythmicUnits),
            allowEmptyBars
          )
        : getNewTupletBars(
            1,
            getSelectedTupletValues(checkedTupletValues),
            allowEmptyBars
          );

      state.bars = bars.slice(1).concat(newBar);
    },
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
    setCheckedTupletValue: (
      state,
      action: PayloadAction<ISetCheckedTupletValueActionPayload>
    ) => {
      state.checkedTupletValues[action.payload.path] = action.payload.value;
    },
    setPhase: (state, action: PayloadAction<RhythmPracticePhases>) => {
      state.phase = action.payload;
    },
    stopExercise: (state) => {
      state.bars = [];
      state.phase = "stopped";
    },
  },
});

export const {
  loadNewImage,
  setAllowEmptyBars,
  setCheckedRhythmicGroup,
  setCheckedTupletValue,
  setMode,
  setPhase,
  setPlayAnswer,
  setPlayEveryEighth,
  setRepInput,
  setTempo,
  startExercise: handleStartExercise,
  stopExercise,
} = rhythmPracticeSlice.actions;

export default rhythmPracticeSlice.reducer;
