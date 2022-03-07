import * as React from "react";

import { synth } from "../reducer/reducer";

const ReleaseAllButton = () => {
  const onRelease = () => {
    synth.releaseAll();
  };

  return (
    <div className="waveselector" onClick={onRelease}>
      Release all
    </div>
  );
};

export default ReleaseAllButton;
