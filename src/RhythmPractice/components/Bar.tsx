import * as React from "react";
import { useSelector } from "react-redux";

import { RootState } from "../../store/store";
import { selectIsBarMode, selectTimeSignature } from "../reducer/selectors";
import Figures from "./Figures";
import TupletBrackets from "./TupletBrackets";
import TimeSignature from "./TimeSignature";
import { TupletValues } from "../../UnicodeAssignment";

import "./Bar.css";

interface IBarProps {
  index: number;
}

const Bar = ({ index }: IBarProps) => {
  const timeSignature = useSelector((state: RootState) =>
    selectTimeSignature(state, index)
  ) as TupletValues;

  const isBarMode = useSelector(selectIsBarMode);

  return (
    <div className="rp-bar">
      <TimeSignature index={index} />
      <div className="rp-barcontainer">
        {!isBarMode && <TupletBrackets tupletLength={timeSignature} />}
        <Figures index={index} />
      </div>
    </div>
  );
};

export default Bar;
