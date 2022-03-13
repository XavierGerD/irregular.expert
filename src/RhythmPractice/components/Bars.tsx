import * as React from "react";
import { useSelector } from "react-redux";

import { barlines } from "../../UnicodeAssignment";
import { selectHasStarted } from "../reducer/selectors";
import Bar from "./Bar";

const Bars = () => {
  const isStarted = useSelector(selectHasStarted);

  if (!isStarted) {
    return null;
  }

  return (
    <div className="rp-bars">
      <Bar index={0} />
      <div className="rp-barline">{barlines.singleBarline}</div>
      <Bar index={1} />
    </div>
  );
};

export default Bars;
