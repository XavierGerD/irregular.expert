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

  return (
    <div className="temperament-selector">
      Global detune (cents +/-)
      <input
        className="rp-inputBox"
        style={{
          marginRight: "10px",
          width: "25px",
        }}
        type="input"
        value={globalDetune}
        onChange={onChange}
      />
    </div>
  );
};

export default GlobalDetune;
