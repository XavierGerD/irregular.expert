import * as React from "react";
import {
  tupletBracketCodes,
  tupletCodes,
  TupletValues,
} from "../../UnicodeAssignment";

interface ITupletBracketsProps {
  tupletLength: TupletValues;
}

const TupletBrackets = ({ tupletLength }: ITupletBracketsProps) => (
  <div className="rp-tupletbrackets">
    <div>{tupletBracketCodes.left}</div>
    <div className="rp-tupletvalue">{tupletCodes[tupletLength]}</div>
    <div>{tupletBracketCodes.right}</div>
  </div>
);

export default TupletBrackets;
