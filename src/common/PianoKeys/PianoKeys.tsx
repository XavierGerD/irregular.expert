import * as React from "react";

import { IPitchValue } from "../../Data";
import { RootState } from "../../store/store";
import BlackNotes from "./BlackNotes";
import WhiteNotes from "./WhiteNotes";

import "./PianoKeys.css";

export type SelectNotes = (state: RootState) => IPitchValue[];

interface IPianoKeysProps {
  monophonic?: boolean;
  selectNotes: SelectNotes;
}

const PianoKeys = ({ monophonic, selectNotes }: IPianoKeysProps) => (
  <div className="piano-keys">
    <BlackNotes monophonic={monophonic} selectNotes={selectNotes} />
    <WhiteNotes monophonic={monophonic} selectNotes={selectNotes} />
  </div>
);

export default PianoKeys;
