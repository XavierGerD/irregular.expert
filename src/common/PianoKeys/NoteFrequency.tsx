import * as React from "react";

import "./NoteFrequency.css";

interface INoteFrequencyProps {
  frequency: number;
}

const NoteFrequency = ({ frequency }: INoteFrequencyProps) => (
  <div className="note-frequency">{frequency.toFixed(2)}</div>
);

export default NoteFrequency;
