import * as React from "react";

import { synth } from "../synth";

const VolumeAdjust = () => {
  const adjustVolume = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newVolume = parseInt(event.target.value);
      synth.volume.value = newVolume;
    },
    [synth]
  );

  return (
    <div className="vertical-slider-container">
      <div>Volume</div>
      <input
        type="range"
        min="-12"
        max="12"
        className="slider-vertical"
        id="volumeSlider"
        defaultValue="0"
        onChange={adjustVolume}
      />
    </div>
  );
};

export default VolumeAdjust;
