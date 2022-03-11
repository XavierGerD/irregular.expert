import * as React from "react";
import { useSelector } from "react-redux";

import { IPitchValue } from "../types";
import { getIsNoteAltered } from "../../Detune/reducer/utils";
import Note from "./Note";
import { SelectNotes } from "./PianoKeys";

import "./BlackNotes.css";

interface IBlackNotesProps {
  monophonic?: boolean;
  showFrequency?: boolean;
  showNoteName?: boolean;
  selectNotes: SelectNotes;
}

const BlackNotes = ({
  monophonic,
  showFrequency,
  showNoteName,
  selectNotes,
}: IBlackNotesProps) => {
  const notes = useSelector(selectNotes);

  return (
    <div className="blacknotes">
      {notes.map((note: IPitchValue) => {
        if (!getIsNoteAltered(note.pitchClass)) {
          return null;
        }

        const addSpacer = note.pitchClass === "Eb" || note.pitchClass === "Bb";

        return (
          <React.Fragment key={note.frequency}>
            <Note
              className={"blacknotebutton"}
              note={note}
              monophonic={monophonic}
              showFrequency={showFrequency}
              showNoteName={showNoteName}
            />
            {addSpacer && <div className="notespacer" />}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default BlackNotes;
