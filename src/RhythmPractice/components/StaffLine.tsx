import * as React from "react";
import { useSelector } from "react-redux";

import { singleStaff } from "../../UnicodeAssignment";
import { selectHasStarted } from "../reducer/selectors";

const StaffLine = () => {
  const hasStarted = useSelector(selectHasStarted);

  if (!hasStarted) {
    return null;
  }

  return <div className="rp-singlestaff">{singleStaff}</div>;
};

export default StaffLine;
