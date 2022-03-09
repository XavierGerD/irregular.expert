import * as React from "react";

import "./OctaveSelector.css";

interface IOctaveSelectorProps {
  selectedOctave: number;
  onChange: (octave: number) => () => void;
}

const OctaveSelector = ({ selectedOctave, onChange }: IOctaveSelectorProps) => (
  <div className="select-container">
    <div className="small-title">OCTAVE</div>
    <div className="octave-selector-container">
      {[...new Array(4)].map((arg: any, index: number) => {
        const octave = index + 2;
        const className =
          selectedOctave === octave
            ? "octave-selector selected"
            : "octave-selector";

        return (
          <div className={className} onClick={onChange(octave)}>
            {octave}
          </div>
        );
      })}
    </div>
  </div>
);

export default OctaveSelector;
