import * as React from "react";
import { useSelector } from "react-redux";

import { IPitchValue } from "../../reducer/slice";
import { selectPitchValues } from "../../reducer/selectors";
import { getIsNoteAltered } from "../../reducer/utils";
import Note from "./Note";

const BlackNotes = () => {
  const notes = useSelector(selectPitchValues);

  return (
    <div className="blacknotes">
      {notes.map((note: IPitchValue) => {
        if (!getIsNoteAltered(note.pitchClass)) {
          return null;
        }

        const addSpacer = note.pitchClass === "Eb" || note.pitchClass === "Bb";

        return (
          <>
            <Note
              key={note.frequency}
              className={"blacknotebutton"}
              note={note}
            />
            {addSpacer && <div className="notespacer" />}
          </>
        );
      })}
    </div>
  );
};

export default BlackNotes;
