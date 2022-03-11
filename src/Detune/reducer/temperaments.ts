import { PayloadAction } from "@reduxjs/toolkit";
import * as Tone from "tone";
import {
  pitchClasses,
  justRatios,
  JustRatios,
  PitchClasse,
} from "../../common/types";
import { IDetuneState } from "./slice";
import { IPitchValue } from "../../common/types";

interface ISetEqualTemperamentPayloadAction {
  division: number;
}

const getFrequency = (
  baseFrequency: number,
  j: number,
  division: number,
  i: number
) => baseFrequency * Math.pow(2, j / division) * Math.pow(2, i);

const getPitchValue =
  (division: number, i: number) =>
  (pitchClass: PitchClasse, j: number): IPitchValue => {
    const baseFrequency = Tone.Frequency("C0").toFrequency();

    return {
      pitchClass,
      octave: i,
      frequency: getFrequency(baseFrequency, j, division, i),
      ratio: undefined,
    };
  };

export const setEqualTemperament = (
  state: IDetuneState,
  payload: PayloadAction<ISetEqualTemperamentPayloadAction>
) => {
  const { division } = payload.payload;

  const pitchValues = [...new Array(2)].flatMap((_: number, index: number) =>
    pitchClasses.map(getPitchValue(division, index + 4))
  );

  state.pitchValues = pitchValues;
  state.currentTemperament = "equal";
};

// cut the ratios array in half and switch the position of the two halves.
// this is done so that the index of the ratios matches the index of the pitch classes
// for example if we want just intonation in F, the index of ratio [1, 1] must match the index of F
const getRatiosFromTonic = (index: number) => {
  const ratios = [...justRatios];
  const distanceToEnd = pitchClasses.length - index;
  const firstHalf = ratios.slice(distanceToEnd, ratios.length);
  const secondHalf = ratios.slice(0, distanceToEnd);
  return firstHalf.concat(secondHalf);
};

const getNewFrequency = (
  tonicFrequency: number,
  ratio: JustRatios,
  octaveMultiplier: number
) => ((tonicFrequency * ratio[0]) / ratio[1]) * octaveMultiplier;

export const setJustTemperament = (state: IDetuneState) => {
  const { pitchValues, justTemperamentStartingPitch: tonic } = state;

  //find the frequency of the note from which to derive rations
  const tonicFrequency = Tone.Frequency(tonic + "4").toFrequency();
  const index = pitchClasses.indexOf(tonic);
  const ratiosRearranged: JustRatios[] = getRatiosFromTonic(index);

  let offset = 0;
  let octaveMultiplier = 1;

  const newPitchValues: IPitchValue[] = pitchValues.map((pitchValue, i) => {
    const ratio = ratiosRearranged[i - offset];
    let frequency = getNewFrequency(tonicFrequency, ratio, octaveMultiplier);

    if (i - offset < index) {
      frequency = frequency / 2;
    }

    if (i === ratiosRearranged.length - 1) {
      offset += 12;
      octaveMultiplier = octaveMultiplier * 2;
    }

    return { ...pitchValue, ratio, frequency };
  });

  state.pitchValues = newPitchValues;
  state.currentTemperament = "just";
};
