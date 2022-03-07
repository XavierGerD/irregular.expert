import * as React from "react";

import { pitchClasses } from "../../../Data";

interface IStartingPitchSelectorProps {
  selectedValue: string;
  disabled: boolean;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const StartingPitchSelector = ({
  selectedValue,
  disabled,
  onChange,
}: IStartingPitchSelectorProps) => (
  <select className="dropdown-select" disabled={disabled} onChange={onChange}>
    {pitchClasses.map((pitchClass) => (
      <option
        selected={pitchClass === selectedValue}
        key={pitchClass}
        value={pitchClass}
      >
        {pitchClass}
      </option>
    ))}
  </select>
);

export default StartingPitchSelector;