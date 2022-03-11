import * as Tone from "tone";
import { PitchClasse } from "./types";

export const synth = new Tone.PolySynth(Tone.Synth, {
  oscillator: { type: "triangle" },
}).toDestination();

export const setNote = (note: PitchClasse | number) => {
  synth.triggerAttack(note);
};

export const releaseAll = () => synth.releaseAll();
