import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";

import { sum } from "../reducer/figuresUtils";
import { selectIsRhythmicUnitChecked } from "../reducer/selectors";
import { RhythmicSubdivision, setCheckedRhythmicGroup } from "../reducer/slice";
import { RHYTHMIC_UNITS, RhythmicUnitKeys } from "../RhythmicUnits";

interface IValueSelectorProps {
  unitKey: RhythmicUnitKeys;
}

const BarValueSelector = ({ unitKey }: IValueSelectorProps) => {
  const dispatch = useDispatch();

  const isChecked = useSelector((state: RootState) =>
    selectIsRhythmicUnitChecked(state, unitKey)
  );

  const onClick = React.useCallback(() => {
    dispatch(setCheckedRhythmicGroup({ path: unitKey, value: !isChecked }));
  }, [dispatch, isChecked]);

  const subdivisions = RHYTHMIC_UNITS[unitKey];

  const sumValue = React.useMemo(
    () => subdivisions.reduce(sum, 0),
    [subdivisions]
  );

  const subidivisionsIndicator = React.useMemo(
    () =>
      subdivisions.reduce(
        (indicator: string, subdivision: RhythmicSubdivision, index) => {
          if (index === subdivisions.length - 1) {
            return `${indicator}${subdivision})`;
          }
          return `${indicator}${subdivision} + `;
        },
        " ("
      ),
    [unitKey]
  );

  return (
    <div>
      {sumValue}
      {subidivisionsIndicator}
      <input
        type="checkbox"
        onClick={onClick}
        defaultChecked={isChecked}
        className="checkbox"
        id={"timeSigButton" + subdivisions}
      />
    </div>
  );
};

export default BarValueSelector;
