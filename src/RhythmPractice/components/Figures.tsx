import * as React from "react";
import { useSelector } from "react-redux";

import { RootState } from "../../store/store";
import { FirstEvent, LastEvent, MiddleEvents } from "../components/Beamchecker";
import { selectRhythmicEvents, selectIsBarMode } from "../reducer/selectors";

interface IFiguresProps {
  index: number;
}

const Figures = ({ index }: IFiguresProps) => {
  const rhythmicEvents = useSelector((state: RootState) =>
    selectRhythmicEvents(state, index)
  );

  const isBarMode = useSelector(selectIsBarMode);

  if (!rhythmicEvents) {
    return null;
  }

  const beamcodeValue = isBarMode ? "eighth" : "sixteenth";

  return (
    <>
      {rhythmicEvents.map((events) => {
        const first = (
          <FirstEvent events={events} beamCodeType={beamcodeValue} />
        );

        const mid = [...new Array(events.length - 2)].map((arg, index) => (
          <MiddleEvents
            events={events}
            index={index}
            beamCodeType={beamcodeValue}
          />
        ));

        const last = <LastEvent events={events} beamCodeType={beamcodeValue} />;

        return (
          <>
            {first}
            {mid}
            {last}
          </>
        );
      })}
    </>
  );
};

export default Figures;
