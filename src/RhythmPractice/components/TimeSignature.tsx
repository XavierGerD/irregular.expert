import * as React from "react";

import TimeSignatureNumerator from "./TimeSignatureNumerator";
import TimeSignatureDenominator from "./TimeSignatureDenominator";

interface ITimeSignatureProps {
  index: number;
}

const TimeSignature = ({ index }: ITimeSignatureProps) => (
  <div className="rp-timesig">
    <TimeSignatureNumerator index={index} />
    <TimeSignatureDenominator index={index} />
  </div>
);

export default TimeSignature;
