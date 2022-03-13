import { RhythmicUnit } from "./reducer/slice";

export const rhythmicUnitKeys = [
  "three",
  "four",
  "five_1",
  "six",
  "seven_1",
  "eight",
] as const;

export type RhythmicUnitKeys = typeof rhythmicUnitKeys[number];

type RhythmicUnitIndexed = { [key in RhythmicUnitKeys]: RhythmicUnit };

export const RHYTHMIC_UNITS: RhythmicUnitIndexed = {
  three: [3],
  four: [2, 2],
  five_1: [3, 2],
  six: [3, 3],
  seven_1: [3, 2, 2],
  eight: [2, 2, 2, 2],
};
