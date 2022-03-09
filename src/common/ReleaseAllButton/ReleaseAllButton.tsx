import * as React from "react";

import { releaseAll } from "../synth";

const ReleaseAllButton = () => {
  const onRelease = () => {
    releaseAll();
  };

  return (
    <div className="waveselector" onClick={onRelease}>
      Release all
    </div>
  );
};

export default ReleaseAllButton;
