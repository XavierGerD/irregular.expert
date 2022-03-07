import * as React from "react";
import { useSelector } from "react-redux";
import { IPitchValue } from "../reducer/reducer";
import { selectOctaveSize, selectShowFrequencies } from "../reducer/selectors";
import NoteFrequency from "./NoteFrequency";
import NoteRatio from "./NoteRatio";
import { synth } from "../reducer/reducer";

interface IBlackNoteProps {
  note: IPitchValue;
  className: string;
}

const BlackNote = ({ note, className }: IBlackNoteProps) => {
  const octaveSize = useSelector(selectOctaveSize);
  const showFrequencies = useSelector(selectShowFrequencies);

  const setNote = () => {
    synth.triggerAttack(note.frequency);
  };

  return (
    <>
      <div className={className} onClick={setNote}>
        <div>
          <div>{octaveSize === 12 ? note.pitchClass : null}</div>
          {note.ratio !== undefined && <NoteRatio ratio={note.ratio} />}
          {showFrequencies && <NoteFrequency frequency={note.frequency} />}
        </div>
      </div>
      {(note.pitchClass === "Eb" || note.pitchClass === "Bb") && (
        <div className="notespacer" />
      )}
    </>
  );
};

export default BlackNote;
