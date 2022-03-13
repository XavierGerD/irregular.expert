import * as React from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectPlayAnswer } from "../../reducer/selectors";
import { setPlayAnswer } from "../../reducer/slice";

const PlaybackAnswerInput = () => {
  const dispatch = useDispatch();
  const playAnswer = useSelector(selectPlayAnswer);
  const onClick = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(setPlayAnswer(event.target.checked));
    },
    [dispatch]
  );

  return (
    <div className="rp-controlitem">
      Play back answer:{" "}
      <input
        checked={playAnswer}
        type="checkbox"
        onChange={onClick}
        className="checkbox"
      />
    </div>
  );
};

export default PlaybackAnswerInput;
