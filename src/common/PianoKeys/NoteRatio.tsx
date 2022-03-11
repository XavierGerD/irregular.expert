import * as React from "react";
import { JustRatios } from "../types";

import "./NoteRatio.css";

interface INoteFrequencyProps {
  ratio: JustRatios;
}

const NoteRatio = ({ ratio }: INoteFrequencyProps) => (
  <div className="note-ratio">
    {ratio[0]}:{ratio[1]}
  </div>
);

export default NoteRatio;
