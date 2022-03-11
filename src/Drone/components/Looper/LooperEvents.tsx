import * as React from "react";
import { useSelector } from "react-redux";

import { selectEvents } from "../../reducer/selectors";
import LooperEvent from "./LooperEvent";

const LooperEvents = () => {
  const events = useSelector(selectEvents);

  return (
    <div className="looper-main" id="looper">
      {events.map((event) => (
        <LooperEvent
          key={event.position}
          position={event.position}
          beats={event.beats}
          note={event.note}
        />
      ))}
    </div>
  );
};

export default LooperEvents;
