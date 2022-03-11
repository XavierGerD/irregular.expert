import { PayloadAction } from "@reduxjs/toolkit";
import * as Tone from "tone";
import { blip01, countdownSound } from "../../Audio";
import { synth } from "../../common/synth";
import { IRhythmicEvent, Pitch } from "../../common/types";
import { IDroneState } from "./slice";

let playFrame: number;
let timeRef: number;

let countDownFrame: number;

let currentBeat = 0;
let currentEvent = 0;

// Unfortunately, it is not possible to get
// the current played note from ToneJS
let currentPlayedNote: Pitch;

const play =
  (events: IRhythmicEvent[], lastClick: number, clickInterval: number) =>
  (time: number) => {
    if (time - lastClick > clickInterval) {
      const { note } = events[currentEvent];
      if (currentBeat === 0 && note !== currentPlayedNote) {
        currentPlayedNote = note;
        synth.releaseAll();
        synth.triggerAttack(note, Tone.context.currentTime);
      }

      blip01.play();
      currentBeat++;
      const event = { ...events[currentEvent] };
      if (currentBeat === event.beats) {
        currentBeat = 0;
        currentEvent++;
        if (currentEvent >= events.length) {
          currentEvent = 0;
        }
      }
      playFrame = requestAnimationFrame(play(events, time, clickInterval));
      return;
    }

    playFrame = requestAnimationFrame(play(events, lastClick, clickInterval));
  };

export const startCountdown = (state: IDroneState) => {
  const { tempo, events, isPlaying } = state.looper;
  const clickInterval = 60000 / tempo;

  if (isPlaying) {
    return;
  }

  // Get rid of the redux proxies recursively.
  const parsed: IRhythmicEvent[] = JSON.parse(JSON.stringify(events));
  requestAnimationFrame(countdown(parsed, timeRef ?? 0, clickInterval));

  state.looper.isPlaying = true;
};

const countdown =
  (events: IRhythmicEvent[], lastClick: number, clickInterval: number) =>
  (time: number) => {
    if (events.length === 0) {
      return;
    }

    if (time - lastClick > clickInterval) {
      if (currentBeat === 4) {
        currentBeat = 0;
        playFrame = requestAnimationFrame(
          play(events, lastClick, clickInterval)
        );
        return;
      }

      countdownSound.play();
      currentBeat++;
      timeRef = time;
      countDownFrame = requestAnimationFrame(
        countdown(events, time, clickInterval)
      );
      return;
    }

    countDownFrame = requestAnimationFrame(
      countdown(events, lastClick, clickInterval)
    );
  };

export const stop = (state: IDroneState) => {
  synth.releaseAll();
  cancelAnimationFrame(playFrame);
  cancelAnimationFrame(countDownFrame);
  currentBeat = 0;
  currentEvent = 0;
  playFrame = 0;
  countDownFrame = 0;

  state.looper.isPlaying = false;
};

interface ISetTempoPayloadAction {
  tempo: number;
}

export const setTempo = (
  state: IDroneState,
  payload: PayloadAction<ISetTempoPayloadAction>
) => {
  state.looper.tempo = payload.payload.tempo;
};
