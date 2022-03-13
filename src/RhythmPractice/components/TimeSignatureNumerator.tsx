import * as React from "react";
import { useSelector } from "react-redux";

import { RootState } from "../../store/store";
import {
  timeSignatureCodes,
  TimeSignatureValues,
} from "../../UnicodeAssignment";
import { selectIsBarMode, selectTimeSignature } from "../reducer/selectors";

const getTimeSignatureNumerator = (isBarMode: boolean, timeSignature: number) =>
  isBarMode && timeSignature === 8
    ? timeSignatureCodes[4]
    : timeSignatureCodes[timeSignature as TimeSignatureValues];

interface ITimeSignatureNumeratorProps {
  index: number;
}

const TimeSignatureNumerator = ({ index }: ITimeSignatureNumeratorProps) => {
  const timeSignature = useSelector((state: RootState) =>
    selectTimeSignature(state, index)
  );

  const isBarMode = useSelector(selectIsBarMode);

  return (
    <div className="time-signature-numerator">
      {isBarMode
        ? getTimeSignatureNumerator(isBarMode, timeSignature)
        : timeSignatureCodes[1]}
    </div>
  );
};

export default TimeSignatureNumerator;
