import * as React from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectMode } from "../../reducer/selectors";
import { setMode } from "../../reducer/slice";

import "./ModeSelector.css";

const ModeSelector = () => {
  const dispatch = useDispatch();
  const mode = useSelector(selectMode);

  const onChange = React.useCallback(() => {
    const newMode = mode === "bar" ? "tuplet" : "bar";
    dispatch(setMode(newMode));
  }, [dispatch, mode]);

  return (
    <div className="rp-controlitem">
      <div className="mode-selector">Mode: </div>
      <div>
        Bar
        <input
          type="radio"
          name="modeselect"
          value="bar"
          className="radiobutton"
          checked={mode === "bar"}
          onChange={onChange}
        />
      </div>
      <div>
        Tuplet
        <input
          type="radio"
          name="modeselect"
          value="tuplet"
          className="radiobutton"
          checked={mode === "tuplet"}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default ModeSelector;
