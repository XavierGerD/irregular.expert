import * as React from "react";
import { useSelector } from "react-redux";

import { IPitchValue } from "../reducer/reducer";
import { selectPitchValues } from "../reducer/selectors";
import { getIsNoteAltered } from "../reducer/utils";

import WhiteNote from "./WhiteNote";

const WhiteNotes = () => {
  const notes = useSelector(selectPitchValues);

  return (
    <div className="whitenotes">
      {notes.map((note: IPitchValue) => {
        if (getIsNoteAltered(note.pitchClass)) {
          return null;
        }

        return (
          <WhiteNote
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
