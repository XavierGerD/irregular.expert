import * as React from "react";
import { useSelector } from "react-redux";

import { IPitchValue } from "../types";
import { getIsNoteAltered } from "../../Detune/reducer/utils";
import Note from "./Note";
import { SelectNotes } from "./PianoKeys";

import "./WhiteNotes.css";

interface IWhiteNotesProps {
  monophonic?: boolean;
  showFrequency?: boolean;
  showNoteName?: boolean;
  selectNotes: SelectNotes;
}
const WhiteNotes = ({
  monophonic,
  showFrequency,
  showNoteName,
  selectNotes,
}: IWhiteNotesProps) => {
  const notes = useSelector(selectNotes);

  return (
    <div className="whitenotes">
      {notes.map((note: IPitchValue) => {
        if (getIsNoteAltered(note.pitchClass)) {
          return null;
        }

        return (
          <Note
            key={note.frequency}
            note={note}
            className={"whitenotebutton"}
            monophonic={monophonic}
            showFrequency={showFrequency}
            showNoteName={showNoteName}
          />
        );
      })}
    </div>
  );
};

export default WhiteNotes;
