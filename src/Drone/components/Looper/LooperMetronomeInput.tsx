import * as React from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectIsPlaying, selectTempo } from "../../reducer/selectors";
import { handleSetTempo } from "../../reducer/slice";

import "./LooperMetronomeInput.css";

const LooperMetronomeInput = () => {
  const dispatch = useDispatch();

  const tempo = useSelector(selectTempo);
  const isPlaying = useSelector(selectIsPlaying);

  const onChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(handleSetTempo({ tempo: parseInt(event.target.value) }));
    },
    [dispatch]
  );

  return (
    <div className="looper-metronome-input">
      METRONOME:
      <input
        disabled={isPlaying}
        type="text"
        value={tempo}
        className="rp-inputBox"
        onChange={onChange}
      ></input>
    </div>
  );
};

export default LooperMetronomeInput;
