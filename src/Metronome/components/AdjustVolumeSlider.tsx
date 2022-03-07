import * as React from "react";

import { blip01 } from "../../Audio";

const AdjustVolumeSlider = () => {
  const adjustVolume = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    blip01.volume(parseInt(event.target.value) / 100);
  };

  return (
    <input
      type="range"
      min="0"
      max="100"
      className="slider"
      id="volumeSlider"
      defaultValue="50"
      onChange={adjustVolume}
    />
  );
};

export default AdjustVolumeSlider;
