import { PayloadAction } from "@reduxjs/toolkit";
import * as Tone from "tone";
import { circleOfFifths, PitchClasses, pitchClasses, IRatio } from "../../Data";
import { IDetuneState, IPitchValue, Temperaments } from "./reducer";

interface IGetRatioBasedPayloadAction {
  tonic: PitchClasses;
  ratio: IRatio;
  temperamentName: Temperaments;
}

const getPitchValues =
  (tonicFrequency: number, octave: number, ratio: number) =>
  (pitchValues: IPitchValue[], pitchClass: PitchClasses) => {
    let frequency = tonicFrequency;
    if (pitchValues.length === 0) {
      return [
        {
          pitchClass,
          octave,
          frequency,
          ratio: undefined,
        },
      ];
    }

    const previousFrequency = pitchValues[pitchValues.length - 1].frequency;
    frequency = previousFrequency * ratio;

    while (frequency > tonicFrequency * 2) {
      frequency = frequency / 2;
    }

    const newPitchValue = {
      pitchClass,
      octave,
      frequency,
      ratio: undefined,
    };

    return pitchValues.concat(newPitchValue);
  };

// Sort pitch classes so the order is from C4 to C5
const sortPitchClasses = (a: IPitchValue, b: IPitchValue) =>
  pitchClasses.indexOf(a.pitchClass) - pitchClasses.indexOf(b.pitchClass);

// Bring all frequencies of an array to the octave above
const doublePitchValues = (pitchValue: IPitchValue) => ({
  ...pitchValue,
  frequency: pitchValue.frequency * 2,
  octave: pitchValue.octave + 1,
});

const normalizePitchValues = (
  tonicFrequency: number,
  pitchValues: IPitchValue[],
) => {
  const upperCPitchValue = pitchValues.find(
    (pitchValue) => pitchValue.pitchClass === "C",
  );

  if (!upperCPitchValue) {
    return pitchValues;
  }

  const { frequency } = upperCPitchValue;

  const upperCFrequency =
    frequency > tonicFrequency ? frequency : frequency * 2;

  return pitchValues.map((pitchClass) => ({
    ...pitchClass,
    frequency:
      pitchClass.frequency >= upperCFrequency
        ? pitchClass.frequency / 2
        : pitchClass.frequency,
  }));
};

export const setRatioBased = (
  state: IDetuneState,
  payload: PayloadAction<IGetRatioBasedPayloadAction>,
) => {
  const octave = 4;
  const { tonic, ratio, temperamentName } = payload.payload;

  //find the frequency of the note from which to derive ratios
  const tonicFrequency = Tone.Frequency(tonic + octave).toFrequency();
  const index = circleOfFifths.indexOf(tonic);

  // Rearrange the circle of fifths to start on the selected tonic.
  const merged = circleOfFifths
    .slice(index, circleOfFifths.length)
    .concat(circleOfFifths.slice(0, index));

  const firstHalf = merged.slice(0, 6);
  const secondHalf = merged.slice(6, merged.length).reverse();

  const firstHalfMapped = firstHalf.reduce(
    getPitchValues(tonicFrequency, octave, ratio.fifth),
    [],
  );

  const secondHalfMapped = secondHalf.reduce(
    getPitchValues(tonicFrequency, octave, ratio.fourth),
    [firstHalfMapped[0]],
  );
  secondHalfMapped.shift();

  const mergedMapped = [...firstHalfMapped, ...secondHalfMapped];
  const octavized = normalizePitchValues(tonicFrequency, mergedMapped);
  const sorted = octavized.sort(sortPitchClasses);
  const doubled = sorted.map(doublePitchValues);

  state.currentTemperament = temperamentName;
  state.pitchValues = sorted.concat(doubled);
};
