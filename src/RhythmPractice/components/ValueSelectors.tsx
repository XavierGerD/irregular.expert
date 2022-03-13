import * as React from "react";

import { rhythmicUnitKeys, RhythmicUnitKeys } from "../RhythmicUnits";
import ValueSelector from "./ValueSelector";

const ValueSelectors = () => (
  <>
    <div className="rp-controlitem">Values:</div>
    <div className="rp-controlitem">
      {rhythmicUnitKeys.map((unitKey: string) => (
        <ValueSelector key={unitKey} unitKey={unitKey as RhythmicUnitKeys} />
      ))}
    </div>
  </>
);

export default ValueSelectors;
