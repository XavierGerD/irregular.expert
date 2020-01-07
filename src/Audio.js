import { Howl } from "howler";

let blip01 = new Howl({ src: ["/Sons/metronome_low.wav"] });
let blip02 = new Howl({ src: ["/Sons/metronome_high.wav"] });
let clap = new Howl({ src: ["/Sons/hand_clap.wav"] });
let countdownSound = new Howl({ src: ["/Sons/countdown.wav"] });

export { blip01, blip02, clap, countdownSound };
