import { TupletValues } from "../../UnicodeAssignment";
import { RhythmicUnitKeys, RHYTHMIC_UNITS } from "../RhythmicUnits";
import { CheckedRhythmicUnits, RhythmicEvent, RhythmicUnit } from "./slice";

export const sum = (accumulator: number, currentValue: number) =>
  accumulator + currentValue;

export const getRandomTupletValue = (
  rhythmicGroups: RhythmicUnit[]
): TupletValues => {
  //obtain a random time signature or tuplet value from all possible user-entered values
  const randomUnit: RhythmicUnit =
    rhythmicGroups[Math.floor(Math.random() * rhythmicGroups.length)];

  return randomUnit.reduce(sum, 0) as TupletValues;
};

export const getRandomTimeSig = (
  rhythmicGroups: RhythmicUnit[]
): RhythmicUnit =>
  rhythmicGroups[Math.floor(Math.random() * rhythmicGroups.length)];

const getRandomRhythmicEvent = (): RhythmicEvent => {
  //generate a random int between 0 and 1
  const min = Math.ceil(0);
  const max = Math.floor(2);
  return (Math.floor(Math.random() * (max - min)) + min) as RhythmicEvent;
};

//Adds values to an array
export const getRhythmicEvents = (
  max: number,
  allowEmptyBars: boolean
): RhythmicEvent[] => {
  const ret = [...new Array(max)].map(() => getRandomRhythmicEvent());

  if (!allowEmptyBars) {
    // if the bar is empty, return a new bar
    const empty = ret.every((value) => value === 0);

    if (empty) {
      return getRhythmicEvents(max, allowEmptyBars);
    }
  }

  return ret;
};

export const getSelectedRhythmicUnits = (
  checkedRhythmicGroups: CheckedRhythmicUnits
) =>
  Object.keys(checkedRhythmicGroups)
    .map((unitKey: string) => {
      if (checkedRhythmicGroups[unitKey as RhythmicUnitKeys]) {
        return RHYTHMIC_UNITS[unitKey as RhythmicUnitKeys];
      }
    })
    .filter(
      (rhythmicUnit: RhythmicUnit | undefined): rhythmicUnit is RhythmicUnit =>
        !!rhythmicUnit
    );
