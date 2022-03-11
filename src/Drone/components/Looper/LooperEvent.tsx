import * as React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Pitch } from "../../../common/types";
import { selectIsPlaying } from "../../reducer/selectors";
import { handleBeatChange, handleNoteChange } from "../../reducer/slice";

import "./LooperEvent.css";

interface ILooperEventProps {
  position: number;
  note: Pitch;
  beats: number;
}

const LooperEvent = ({ position, note, beats }: ILooperEventProps) => {
  const dispatch = useDispatch();

  const isPlaying = useSelector(selectIsPlaying);

  const onNoteChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(
        handleNoteChange({
          index: position,
          // meh
          value: event?.target.value as Pitch,
        })
      );
    },
    [dispatch]
  );

  const onBeatChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(
        handleBeatChange({
          index: position,
          value: parseInt(event?.target.value),
        })
      );
    },
    [dispatch]
  );

  return (
    <div className="looper-event">
      <div className="looper-event-input-container">
        NOTE:{" "}
        <div className="looper-event-input">
          <input
            disabled={isPlaying}
            type="text"
            className="rp-inputBox-small"
            onChange={onNoteChange}
            value={note}
          />
        </div>
      </div>

      <div className="looper-event-input-container">
        BEATS:{" "}
        <div className="looper-event-input">
          <input
            disabled={isPlaying}
            type="text"
            className="rp-inputBox-small"
            onChange={onBeatChange}
            value={beats}
          />
        </div>
      </div>
    </div>
  );
};

export default LooperEvent;
