import * as React from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectPlayEveryEighth } from "../../reducer/selectors";
import { setPlayEveryEighth } from "../../reducer/slice";

const PlayEveryEighthInput = () => {
  const dispatch = useDispatch();
  const playEveryEighth = useSelector(selectPlayEveryEighth);
  const onClick = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(setPlayEveryEighth(event.target.checked));
    },
    [dispatch]
  );

  return (
    <div className="rp-controlitem">
      Click every subdivision:{" "}
      <input
        checked={playEveryEighth}
        type="checkbox"
        onChange={onClick}
        className="checkbox"
      />
    </div>
  );
};

export default PlayEveryEighthInput;
