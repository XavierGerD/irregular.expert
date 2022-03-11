import * as React from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectIsPlaying } from "../../reducer/selectors";
import { handleAddEvent, handleRemoveEvent } from "../../reducer/slice";

import "./LooperEventsAddRemove.css";

const LooperEventsAddRemove = () => {
  const dispatch = useDispatch();
  const isPlaying = useSelector(selectIsPlaying);

  const addEvent = React.useCallback(() => {
    if (isPlaying) {
      return;
    }

    dispatch(handleAddEvent());
  }, [dispatch, isPlaying]);

  const removeEvent = React.useCallback(() => {
    if (isPlaying) {
      return;
    }

    dispatch(handleRemoveEvent());
  }, [dispatch, isPlaying]);

  return (
    <div className="looper-events-add-remove">
      <div onClick={addEvent} className="control-button">
        +
      </div>
      <div onClick={removeEvent} className="control-button">
        -
      </div>
    </div>
  );
};
export default LooperEventsAddRemove;
