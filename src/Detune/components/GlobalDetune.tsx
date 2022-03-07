import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleGlobalDetune } from "../reducer/reducer";
import { selectGlobalDetune } from "../reducer/selectors";

const GlobalDetune = () => {
  const dispatch = useDispatch();
  const globalDetune = useSelector(selectGlobalDetune);

  const onChange = React.useCallback(
    (event) => {
      dispatch(handleGlobalDetune({ value: event.target.value }));
    },
    [dispatch],
  );

  const id = "global-detune-input";

  return (
    <div className="temperament-selector">
      <label htmlFor={id}>Global detune (cents +/-)</label>
      <input
        id={id}
        className="rp-inputBox global-detune-input"
        type="input"
        value={globalDetune}
        onChange={onChange}
      />
    </div>
  );
};

export default GlobalDetune;
