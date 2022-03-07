import * as React from "react";
import { useSelector } from "react-redux";

import { IPitchValue } from "../../reducer/slice";
import { selectPitchValues } from "../../reducer/selectors";
import { getIsNoteAltered } from "../../reducer/utils";
import Note from "./Note";

const WhiteNotes = () => {
  const notes = useSelector(selectPitchValues);

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
          />
        );
      })}
    </div>
  );
};

export default WhiteNotes;
