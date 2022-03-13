import { tupletCodes, TupletValues } from "../../UnicodeAssignment";
import { RhythmicUnitKeys, RHYTHMIC_UNITS } from "../RhythmicUnits";
import {
  CheckedRhythmicUnits,
  CheckedTupletValues,
  RhythmicEvent,
  RhythmicUnit,
} from "./slice";

export const getFigure = (
  rhythmicUnit: RhythmicUnit,
  allowEmptyBars: boolean
): RhythmicEvent[][] =>
  rhythmicUnit.map((subdivision: number) =>
    getRhythmicEvents(subdivision, allowEmptyBars)
  );

export const sum = (accumulator: number, currentValue: number) =>
  accumulator + currentValue;

export const getRandomTupletValue = (
  rhythmicGroups: TupletValues[]
): TupletValues =>
  rhythmicGroups[Math.floor(Math.random() * rhythmicGroups.length)];

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

export const getRhythmicEvents = (
  max: number,
  allowEmptyBars: boolean
): RhythmicEvent[] => {
  const bar = [...new Array(max)].map(() => getRandomRhythmicEvent());

  if (!allowEmptyBars) {
    // if the bar is empty, return a new bar
    const isBarEmpty = bar.every((value) => value === 0);

    if (isBarEmpty) {
      return getRhythmicEvents(max, allowEmptyBars);
    }
  }

  return bar;
};

const getRhthmicUnits =
  (checkedRhythmicUnits: CheckedRhythmicUnits) => (unitKey: string) => {
    if (checkedRhythmicUnits[unitKey as RhythmicUnitKeys]) {
      return RHYTHMIC_UNITS[unitKey as RhythmicUnitKeys];
    }
  };

const filterUndefinedRhythmicUnits = (
  rhythmicUnit: RhythmicUnit | undefined
): rhythmicUnit is RhythmicUnit => !!rhythmicUnit;

export const getSelectedRhythmicUnits = (
  checkedRhythmicGroups: CheckedRhythmicUnits
) =>
  Object.keys(checkedRhythmicGroups)
    .map(getRhthmicUnits(checkedRhythmicGroups))
    .filter(filterUndefinedRhythmicUnits);

const filterUndefinedTupletValues = (
  tupletValue: TupletValues | undefined
): tupletValue is TupletValues => !!tupletValue;

const getTupletValues =
  (checkedTupletValues: CheckedTupletValues) => (tupletValue: string) => {
    if (checkedTupletValues[parseInt(tupletValue) as TupletValues]) {
      return parseInt(tupletValue) as TupletValues;
    }
  };

export const getSelectedTupletValues = (
  checkedTupletValues: CheckedTupletValues
) =>
  Object.keys(checkedTupletValues)
    .map(getTupletValues(checkedTupletValues))
    .filter(filterUndefinedTupletValues);
