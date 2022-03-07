import * as React from "react";

import { useDispatch } from "react-redux";
import { handleStart } from "../reducer/slice";

const PlayButton = () => {
  const dispatch = useDispatch();
  const onClick = React.useCallback(() => {
    dispatch(handleStart());
  }, [dispatch]);

  return (
    <div onClick={onClick} className="dr-button1">
      PLAY!
    </div>
  );
};

export default PlayButton;
