import * as React from "react";

import { PitchClasse } from "../types";

interface INotePitchClassProps {
  pitchClass: PitchClasse;
}

const NotePitchClass = ({ pitchClass }: INotePitchClassProps) => (
  <div className="pitch-class">{pitchClass}</div>
);

export default NotePitchClass;
