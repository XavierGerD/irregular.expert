import * as React from "react";

import { useDispatch, useSelector } from "react-redux";
import { getTempo } from "../reducer/selectors";
import { setTempo } from "../reducer/slice";

const TempoInput = () => {
  const dispatch = useDispatch();
  const tempo = useSelector(getTempo);
  const onClick = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) =>
      dispatch(setTempo({ tempo: parseFloat(event.target.value) })),
    [dispatch]
  );

  return (
    <div style={{ display: "flex" }}>
      METRONOME:
      <input
        type="text"
        value={tempo}
        className="rp-inputBox"
        onChange={onClick}
      />
    </div>
  );
};

export default TempoInput;
