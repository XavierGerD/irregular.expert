import * as React from "react";

import { IPitchValue } from "../../Data";
import NoteFrequency from "./NoteFrequency";
import NoteRatio from "./NoteRatio";
import { synth, setNote as setSynthNote, releaseAll } from "../synth";

import "./Note.css";

interface IBlackNoteProps {
  monophonic?: boolean;
  note: IPitchValue;
  className: string;
}

const Note = ({ monophonic = false, note, className }: IBlackNoteProps) => {
  const setNote = React.useCallback(() => {
    if (monophonic) {
      releaseAll();
    }

    setSynthNote(note.frequency);
  }, [note, monophonic]);

  return (
    <div className={className} onClick={setNote}>
      <div>
        <div className="pitch-class">{note.pitchClass}</div>
        {!!note.ratio && <NoteRatio ratio={note.ratio} />}
        <NoteFrequency frequency={note.frequency} />
      </div>
    </div>
  );
};

export default Note;
