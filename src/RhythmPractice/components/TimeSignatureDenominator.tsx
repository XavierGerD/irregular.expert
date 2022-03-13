import * as React from "react";
import { useSelector } from "react-redux";

import { RootState } from "../../store/store";
import { timeSignatureCodes } from "../../UnicodeAssignment";
import { selectIsBarMode, selectTimeSignature } from "../reducer/selectors";

const getTimeSignatureDenominator = (
  isBarMode: boolean,
  timeSignature: number
) => {
  if (isBarMode) {
    return timeSignature === 8 ? timeSignatureCodes[4] : timeSignatureCodes[8];
  }
  return timeSignatureCodes[4];
};

interface ITimeSignatureDenominatorProps {
  index: number;
}

const TimeSignatureDenominator = ({
  index,
}: ITimeSignatureDenominatorProps) => {
  const timeSignature = useSelector((state: RootState) =>
    selectTimeSignature(state, index)
  );

  const isBarMode = useSelector(selectIsBarMode);

  return (
    <div className="time-signature-denominator">
      {getTimeSignatureDenominator(isBarMode, timeSignature)}
    </div>
  );
};

export default TimeSignatureDenominator;
