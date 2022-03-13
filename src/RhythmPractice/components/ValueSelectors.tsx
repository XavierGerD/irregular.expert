import * as React from "react";
import { useSelector } from "react-redux";

import { tupletCodes, TupletValues } from "../../UnicodeAssignment";
import { selectIsBarMode } from "../reducer/selectors";
import { rhythmicUnitKeys, RhythmicUnitKeys } from "../RhythmicUnits";
import TupletValueSelector from "./TupletValueSelector";
import BarValueSelector from "./ValueSelector";

import "./ValueSelectors.css";

const ValueSelectors = () => {
  const isBarMode = useSelector(selectIsBarMode);

  return (
    <div className="value-selectors-container">
      <div className="rp-controlitem value-selectors-title">Values</div>
      <div className="value-selectors">
        {isBarMode
          ? rhythmicUnitKeys.map((unitKey: string) => (
              <BarValueSelector
                key={unitKey}
                unitKey={unitKey as RhythmicUnitKeys}
              />
            ))
          : Object.keys(tupletCodes).map((tupletKey: string) => (
              <TupletValueSelector
                key={tupletKey}
                tupletValue={parseInt(tupletKey) as TupletValues}
              />
            ))}
      </div>
    </div>
  );
};
export default ValueSelectors;
