import * as React from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectTempo } from "../../reducer/selectors";
import { setTempo } from "../../reducer/slice";

const TempoInput = () => {
  const dispatch = useDispatch();
  const tempo = useSelector(selectTempo);

  const onChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) =>
      dispatch(setTempo(parseInt(event.target.value))),
    [dispatch]
  );

  return (
    <div className="rp-controlitem">
      Tempo:{" "}
      <input
        type="text"
        onChange={onChange}
        value={tempo}
        className="rp-inputBox"
      />
    </div>
  );
};

export default TempoInput;
