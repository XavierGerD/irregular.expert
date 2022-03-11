import * as React from "react";

import { Waveforms, waveforms } from "../types";
import { synth } from "../synth";

import "./WaveSelector.css";

const WaveSelector = () => {
  const [selectedWave, setSelectedWave] = React.useState<Waveforms>("triangle");

  const onClick = (waveForm: Waveforms) => () => {
    setSelectedWave(waveForm);
    synth.set({ oscillator: { type: waveForm } });
  };

  return (
    <div className="waveselector-container">
      {waveforms.map((waveform) => {
        const className =
          selectedWave === waveform ? "waveselector selected" : "waveselector";

        return (
          <div key={waveform} className={className} onClick={onClick(waveform)}>
            {waveform.charAt(0).toUpperCase() + waveform.slice(1)}
          </div>
        );
      })}
    </div>
  );
};

export default WaveSelector;
