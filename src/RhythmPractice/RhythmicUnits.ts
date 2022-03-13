import { RhythmicUnit } from "./reducer/slice";

export const rhythmicUnitKeys = [
  "three",
  "four",
  "five_1",
  "five_2",
  "six",
  "seven_1",
  "seven_2",
  "seven_3",
  "eight_1",
  "eight_2",
] as const;

export type RhythmicUnitKeys = typeof rhythmicUnitKeys[number];

type RhythmicUnitIndexed = { [key in RhythmicUnitKeys]: RhythmicUnit };

export const RHYTHMIC_UNITS: RhythmicUnitIndexed = {
  three: [3],
  four: [2, 2],
  five_1: [3, 2],
  five_2: [2, 3],
  six: [3, 3],
  seven_1: [3, 2, 2],
  seven_2: [2, 3, 2],
  seven_3: [2, 2, 3],
  eight_1: [2, 2, 2, 2],
  eight_2: [3, 3, 2],
};
