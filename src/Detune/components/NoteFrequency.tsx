import * as React from "react";

interface INoteFrequencyProps {
  frequency: number;
}

const NoteFrequency = ({ frequency }: INoteFrequencyProps) => (
  <div
    style={{
      fontSize: "15px",
      display: "flex",
      justifyContent: "center",
    }}
  >
    {frequency.toFixed(2)}
  </div>
);

export default NoteFrequency;
