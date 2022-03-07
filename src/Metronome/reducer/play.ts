import { IMetronomeState } from "./slice";
import { blip01 } from "../../Audio";

let playFrame: number;
let timeRef: number;

const play = (lastClick: number, clickInterval: number) => (time: number) => {
  if (time - lastClick > clickInterval) {
    blip01.play();
    playFrame = requestAnimationFrame(play(time, clickInterval));
    timeRef = time;
    return;
  }
  playFrame = requestAnimationFrame(play(lastClick, clickInterval));
};

export const start = (state: IMetronomeState) => {
  const { tempo } = state;
  const clickInterval = 60000 / tempo;
  if (playFrame) {
    return;
  }

  requestAnimationFrame(play(timeRef ?? 0, clickInterval));
};

export const stop = () => {
  cancelAnimationFrame(playFrame);
  playFrame = 0;
};
