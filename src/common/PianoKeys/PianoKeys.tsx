import * as React from "react";

import { IPitchValue } from "../types";
import { RootState } from "../../store/store";
import BlackNotes from "./BlackNotes";
import WhiteNotes from "./WhiteNotes";

import "./PianoKeys.css";

export type SelectNotes = (state: RootState) => IPitchValue[];

interface IPianoKeysProps {
  selectNotes: SelectNotes;
  monophonic?: boolean;
  showFrequency?: boolean;
  showNoteName?: boolean;
}

const PianoKeys = ({
  monophonic,
  showFrequency,
  showNoteName,
  selectNotes,
}: IPianoKeysProps) => (
  <div className="piano-keys">
    <BlackNotes
      showFrequency={showFrequency}
      monophonic={monophonic}
      showNoteName={showNoteName}
      selectNotes={selectNotes}
    />
    <WhiteNotes
      showFrequency={showFrequency}
      monophonic={monophonic}
      showNoteName={showNoteName}
      selectNotes={selectNotes}
    />
  </div>
);

export default PianoKeys;
