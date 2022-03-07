import * as React from "react";

import { useDispatch } from "react-redux";
import { handleStop } from "../reducer/slice";

const StopButton = () => {
  const dispatch = useDispatch();
  const onClick = React.useCallback(() => {
    dispatch(handleStop());
  }, [dispatch]);

  return (
    <div onClick={onClick} className="dr-button1">
      STOP!
    </div>
  );
};

export default StopButton;
