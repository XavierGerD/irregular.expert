import * as Tone from "tone";
import { PitchClasses } from "../Data";

export const synth = new Tone.PolySynth(Tone.Synth, {
  oscillator: { type: "triangle" },
}).toDestination();

export const setNote = (note: PitchClasses | number) => {
  synth.triggerAttack(note);
};

export const releaseAll = () => synth.releaseAll();
