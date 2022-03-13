export const singleStaff = "\uE010";
export const staffSegment = "\uE014";
export const ledgerLine = "\uE022";
export const stem = "\uE210";
export const flagCodes = {
  eighth: { up: "\uE240", down: "\uE241" },
  sixteenth: { up: "\uE242", down: "\uE243" },
};

export const barlines = {
  startingBarline: "\uE034",
  finalBarline: "\uE032",
  singleBarline: "\uE030",
};

export type BeamCodesValues = "eighth" | "sixteenth";
export type BeamCodes = { [value in BeamCodesValues]: string };

export const beamCodes: BeamCodes = {
  eighth: "\uE1F8",
  sixteenth: "\uE1FA",
};

export type TimeSignatureValues = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export const timeSignatureCodes = {
  1: "\uE081",
  2: "\uE082",
  3: "\uE083",
  4: "\uE084",
  5: "\uE085",
  6: "\uE086",
  7: "\uE087",
  8: "\uE088",
};

export const accidentalCodes = {
  flat: "\uE260",
  natural: "\uE261",
  sharp: "\uE262",
};

export const clefCodes = {
  treble: { code: "\uE050", position: -0.25, noteOffset: 0 },
  bass: { code: "\uE062", position: -0.75, noteOffset: 0.25 },
  alto: { code: "\uE05C", position: -0.5, noteOffset: 0.125 },
};

export const noteheadCodes = {
  sixteenth: "\uE0A4",
  eighth: "\uE0A4",
  quarter: "\uE0A4",
  half: "\uE0A3",
  whole: "\uE0A2",
};

export const restCodes = {
  whole: "\uE4E3",
  half: "\uE4E4",
  quarter: "\uE4E5",
  eighth: "\uE4E6",
  sixteenth: "\uE4E7",
};

export const completeNotes = {
  beamless: "\uE1F1",
  eighth: "\uE1F3",
  sixteenth: "\uE1F5",
};

export const tupletBracketCodes = {
  left: "\uE201",
  right: "\uE203",
};

export type TupletValues = 3 | 4 | 5 | 6 | 7;

export const tupletCodes = {
  3: "\uE883",
  4: "\uE884",
  5: "\uE885",
  6: "\uE886",
  7: "\uE887",
};
