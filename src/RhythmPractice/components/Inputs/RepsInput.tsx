import * as React from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectReps } from "../../reducer/selectors";
import { setRepInput } from "../../reducer/slice";

const RepsInput = () => {
  const dispatch = useDispatch();
  const reps = useSelector(selectReps);

  const onChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) =>
      dispatch(setRepInput(parseInt(event.target.value))),
    [dispatch]
  );

  return (
    <div className="rp-controlitem">
      Reps:{" "}
      <input
        type="text"
        onChange={onChange}
        value={reps}
        className="rp-inputBox"
      />
    </div>
  );
};

export default RepsInput;
