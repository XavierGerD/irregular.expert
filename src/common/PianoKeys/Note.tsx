import * as React from "react";

import { IPitchValue } from "../../Data";
import NoteFrequency from "./NoteFrequency";
import NoteRatio from "./NoteRatio";
import { setNote as setSynthNote, releaseAll } from "../synth";

import "./Note.css";
import NotePitchClass from "./NotePitchClass";

interface IBlackNoteProps {
  note: IPitchValue;
  className: string;
  monophonic?: boolean;
  showFrequency?: boolean;
  showNoteName?: boolean;
}

const Note = ({
  monophonic = false,
  showFrequency = true,
  showNoteName = false,
  note,
  className,
}: IBlackNoteProps) => {
  const { pitchClass, ratio, frequency } = note;
  const setNote = React.useCallback(() => {
    if (monophonic) {
      releaseAll();
    }

    setSynthNote(note.frequency);
  }, [note, monophonic]);

  return (
    <div className={className} onClick={setNote}>
      <div>
        {showNoteName && <NotePitchClass pitchClass={pitchClass} />}
        {!!ratio && <NoteRatio ratio={ratio} />}
        {showFrequency && <NoteFrequency frequency={frequency} />}
      </div>
    </div>
  );
};

export default Note;
