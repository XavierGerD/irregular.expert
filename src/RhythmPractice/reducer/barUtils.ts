import { TupletValues } from "../../UnicodeAssignment";
import {
  getFigure,
  getRandomTimeSig,
  getRandomTupletValue,
  getRhythmicEvents,
  sum,
} from "./figuresUtils";
import { IBar, ITuplet, RhythmicUnit } from "./slice";

export const getNewBar = (
  timeSignatureNumerator: RhythmicUnit,
  allowEmptyBars: boolean
): IBar => ({
  type: "bar",
  rhythmicEvents: getFigure(timeSignatureNumerator, allowEmptyBars),
  timeSignature: timeSignatureNumerator.reduce(sum, 0),
  subdivisions: timeSignatureNumerator,
});

export const getNewBars = (
  numberOfBars: number,
  selectedGroups: RhythmicUnit[],
  allowEmptyBars: boolean
) => {
  const newTimeSignatures = [...new Array(numberOfBars)].map(() =>
    getRandomTimeSig(selectedGroups)
  );

  return newTimeSignatures.map(
    (newTimeSignatureNumerator): IBar =>
      getNewBar(newTimeSignatureNumerator, allowEmptyBars)
  );
};

export const getNewTupletBar = (
  timeSignatureNumerator: TupletValues,
  allowEmptyBars: boolean
): ITuplet => ({
  type: "tuplet",
  rhythmicEvents: [getRhythmicEvents(timeSignatureNumerator, allowEmptyBars)],
  timeSignature: timeSignatureNumerator,
  subdivisions: timeSignatureNumerator,
});

export const getNewTupletBars = (
  numberOfBars: number,
  selectedGroups: TupletValues[],
  allowEmptyBars: boolean
) => {
  const newTupletSizes = [...new Array(numberOfBars)].map(() =>
    getRandomTupletValue(selectedGroups)
  );

  return newTupletSizes.map(
    (newTimeSignatureNumerator): ITuplet =>
      getNewTupletBar(newTimeSignatureNumerator, allowEmptyBars)
  );
};
