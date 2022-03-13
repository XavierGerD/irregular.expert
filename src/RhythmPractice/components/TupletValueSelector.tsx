import * as React from "react";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../../store/store";
import { TupletValues } from "../../UnicodeAssignment";
import { selectIsTupletValueChecked } from "../reducer/selectors";
import { setCheckedTupletValue } from "../reducer/slice";

interface IValueSelectorProps {
  tupletValue: TupletValues;
}

const TupletValueSelector = ({ tupletValue }: IValueSelectorProps) => {
  const dispatch = useDispatch();

  const isChecked = useSelector((state: RootState) =>
    selectIsTupletValueChecked(state, tupletValue)
  );

  const onClick = React.useCallback(() => {
    dispatch(setCheckedTupletValue({ path: tupletValue, value: !isChecked }));
  }, [dispatch, isChecked]);

  return (
    <div>
      {tupletValue}
      <input
        type="checkbox"
        onClick={onClick}
        defaultChecked={isChecked}
        className="checkbox"
        id={"timeSigButton" + tupletValue}
      />
    </div>
  );
};

export default TupletValueSelector;
