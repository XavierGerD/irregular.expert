import { TupletValues } from "../../UnicodeAssignment";
import { getRhythmicEvents, sum } from "./figuresUtils";
import { RhythmicEvent, RhythmicUnit } from "./slice";

export const getFigure = (
  rhythmicUnit: RhythmicUnit,
  allowEmptyBars: boolean
): RhythmicEvent[][] =>
  rhythmicUnit.map((subdivision: number) =>
    getRhythmicEvents(subdivision, allowEmptyBars)
  );

export const getNewBar = (
  timeSignatureNumerator: RhythmicUnit,
  allowEmptyBars: boolean
) => ({
  rhythmicEvents: getFigure(timeSignatureNumerator, allowEmptyBars),
  timeSignature: timeSignatureNumerator.reduce(sum, 0),
});

export const getNewTupletBar = (
  timeSignatureNumerator: TupletValues,
  allowEmptyBars: boolean
) => ({
  rhythmicEvents: [getRhythmicEvents(timeSignatureNumerator, allowEmptyBars)],
  timeSignature: timeSignatureNumerator,
});
