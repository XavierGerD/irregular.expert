import * as React from "react";

import { IPitchValue } from "../../reducer/slice";
import NoteFrequency from "./NoteFrequency";
import NoteRatio from "./NoteRatio";
import { synth } from "../../reducer/slice";

import "./Note.css";

interface IBlackNoteProps {
  note: IPitchValue;
  className: string;
}

const Note = ({ note, className }: IBlackNoteProps) => {
  const setNote = () => {
    synth.triggerAttack(note.frequency);
  };

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
