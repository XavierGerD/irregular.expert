import * as React from "react";
import { JustRatios } from "../../Data";

interface INoteFrequencyProps {
  ratio: JustRatios;
}

const NoteRatio = ({ ratio }: INoteFrequencyProps) => (
  <div
    style={{
      fontSize: "15px",
      display: "flex",
      justifyContent: "center",
    }}
  >
    {ratio[0]}:{ratio[1]}
  </div>
);

export default NoteRatio;
