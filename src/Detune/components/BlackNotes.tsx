import * as React from "react";
import { useSelector } from "react-redux";
import { IPitchValue } from "../reducer/reducer";
import { selectPitchValues } from "../reducer/selectors";
import { getIsNoteAltered } from "../reducer/utils";
import BlackNote from "./BlackNote";

const BlackNotes = () => {
  const notes = useSelector(selectPitchValues);

  return (
    <div className="blacknotes">
      {notes.map((note: IPitchValue) => {
        if (!getIsNoteAltered(note.pitchClass)) {
          return null;
        }

        return (
          <BlackNote
            key={note.frequency}
            className={"blacknotebutton"}
            note={note}
          />
        );
      })}
    </div>
  );
};

export default BlackNotes;
