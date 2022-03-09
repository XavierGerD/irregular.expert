export const justRatios = [
  [1, 1],
  [25, 24],
  [9, 8],
  [6, 5],
  [5, 4],
  [4, 3],
  [45, 32],
  [3, 2],
  [8, 5],
  [5, 3],
  [9, 5],
  [15, 8],
] as const;

export type JustRatios = typeof justRatios[number];

export const pitchClasses = [
  "C",
  "Db",
  "D",
  "Eb",
  "E",
  "F",
  "Gb",
  "G",
  "Ab",
  "A",
  "Bb",
  "B",
] as const;

export type PitchClasses = typeof pitchClasses[number];

export const pitchClassesFromA = [
  "A",
  "Bb",
  "B",
  "C",
  "Db",
  "D",
  "Eb",
  "E",
  "F",
  "Gb",
  "G",
  "Ab",
] as const;

export type PitchClassesFromA = typeof pitchClassesFromA[number];

export const circleOfFifths = [
  "C",
  "G",
  "D",
  "A",
  "E",
  "B",
  "Gb",
  "Db",
  "Ab",
  "Eb",
  "Bb",
  "F",
] as const;

export type CircleOfFifths = typeof circleOfFifths[number];

export interface IRatio {
  fifth: number;
  fourth: number;
}

export const meantoneRatios: IRatio = {
  fifth: (3 / 2) * Math.pow(80 / 81, 1 / 4),
  fourth: (4 / 3) * Math.pow(80 / 81, 1 / 4),
};

export const pythagoreanRatios: IRatio = {
  fifth: 3 / 2,
  fourth: 4 / 3,
};

export const waveforms = ["sine", "square", "triangle", "sawtooth"] as const;
export type Waveforms = typeof waveforms[number];

export interface IPitchValue {
  ratio: JustRatios | undefined;
  pitchClass: PitchClasses;
  octave: number;
  frequency: number;
}
