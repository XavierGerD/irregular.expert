import * as React from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectAllowEmptyBars } from "../../reducer/selectors";
import { setAllowEmptyBars } from "../../reducer/slice";

const AllowEmptyBarsInput = () => {
  const dispatch = useDispatch();
  const allowEmptyBars = useSelector(selectAllowEmptyBars);

  const onClick = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(setAllowEmptyBars(event.target.checked));
    },
    [dispatch]
  );

  return (
    <div className="rp-controlitem">
      Allow empty bars:{" "}
      <input
        checked={allowEmptyBars}
        type="checkbox"
        onChange={onClick}
        className="checkbox"
      />
    </div>
  );
};

export default AllowEmptyBarsInput;
