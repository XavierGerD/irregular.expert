import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";

import { sum } from "../reducer/figuresUtils";
import { selectIsRhythmicUnitChecked } from "../reducer/selectors";
import { setCheckedRhythmicGroup } from "../reducer/slice";
import { RHYTHMIC_UNITS, RhythmicUnitKeys } from "../RhythmicUnits";

interface IValueSelectorProps {
  unitKey: RhythmicUnitKeys;
}

const ValueSelector = ({ unitKey }: IValueSelectorProps) => {
  const dispatch = useDispatch();

  const isChecked = useSelector((state: RootState) =>
    selectIsRhythmicUnitChecked(state, unitKey)
  );

  const onClick = React.useCallback(() => {
    dispatch(setCheckedRhythmicGroup({ path: unitKey, value: !isChecked }));
  }, [dispatch, isChecked]);

  const subdivision = RHYTHMIC_UNITS[unitKey];

  const sumValue = React.useMemo(
    () => subdivision.reduce(sum, 0),
    [subdivision]
  );

  return (
    <div>
      {sumValue}
      {sumValue === 8 && " (4/4)"}
      <input
        type="checkbox"
        onClick={onClick}
        defaultChecked={isChecked}
        className="checkbox"
        id={"timeSigButton" + subdivision}
      />
    </div>
  );
};

export default ValueSelector;
