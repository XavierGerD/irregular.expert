import * as React from "react";

import { PitchClasses } from "../../Data";

interface INotePitchClassProps {
  pitchClass: PitchClasses;
}

const NotePitchClass = ({ pitchClass }: INotePitchClassProps) => (
  <div className="pitch-class">{pitchClass}</div>
);

export default NotePitchClass;
