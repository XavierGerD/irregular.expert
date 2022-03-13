import * as React from "react";
import {
  completeNotes,
  beamCodes,
  flagCodes,
  restCodes,
  BeamCodesValues,
} from "../../../UnicodeAssignment";

interface IFirstProps {
  events: number[];
  beamCodeType: BeamCodesValues;
}

export const FirstEvent = ({ events, beamCodeType }: IFirstProps) => {
  //f the first beat and the second beat are both active, add a beam to the right
  if (events[0] === 1 && events[1] === 1) {
    return (
      <div className="rp-note">
        {completeNotes.beamless}
        <div className="rp-eighthbeam">{beamCodes[beamCodeType]}</div>
      </div>
    );
  }

  //if the first beat is active but the second beat is a rest, add a flag
  if (events[0] === 1 && events[1] === 0) {
    return (
      <div className="rp-note">
        {completeNotes.beamless}

        <div className="rp-eighthflag">{flagCodes[beamCodeType].up}</div>
      </div>
    );
  }

  //if the current beat is a rest, push a rest

  if (events[0] === 0) {
    return (
      <div className="rp-rest" style={{ marginLeft: "0px" }}>
        {restCodes[beamCodeType]}
      </div>
    );
  }

  return null;
};

interface IMiddleEventsProps {
  events: number[];
  index: number;
  beamCodeType: BeamCodesValues;
}

//Checks to see which beam to push for any middle note
export const MiddleEvents = ({
  events,
  index,
  beamCodeType,
}: IMiddleEventsProps) => {
  //if the current beat, the one before and the one after are active, add a through beam
  if (
    events[1 + index] === 1 &&
    events[0 + index] === 1 &&
    events[2 + index] === 1
  ) {
    return (
      <div className="rp-note">
        {completeNotes[beamCodeType]}
        <div className="rp-eighthbeam">{beamCodes[beamCodeType]}</div>
      </div>
    );
  }

  //if the current beat is active, but only the one after is active, add a beam to the right
  if (
    events[0 + index] === 0 &&
    events[1 + index] === 1 &&
    events[2 + index] === 1
  ) {
    return (
      <div className="rp-note">
        {completeNotes.beamless}
        <div className="rp-eighthbeam">{beamCodes[beamCodeType]}</div>
      </div>
    );
  }

  //if the current beam is active, but only the one before is active, add a beam to the left
  if (
    events[0 + index] === 1 &&
    events[1 + index] === 1 &&
    events[2 + index] === 0
  ) {
    return <div className="rp-note">{completeNotes[beamCodeType]}</div>;
  }

  //if only the current beat is active, add a flag
  if (
    events[0 + index] === 0 &&
    events[1 + index] === 1 &&
    events[2 + index] === 0
  ) {
    return (
      <div className="rp-note">
        {completeNotes.beamless}
        <div className="rp-eighthflag">{flagCodes[beamCodeType].up}</div>
      </div>
    );
  }

  //if the current beat is a rest, push a rest

  if (events[1 + index] === 0) {
    return <div className="rp-rest">{restCodes[beamCodeType]}</div>;
  }

  return null;
};

interface ILastEventProps {
  events: number[];
  beamCodeType: BeamCodesValues;
}

//Checks to see which beam for last note
export const LastEvent = ({ events, beamCodeType }: ILastEventProps) => {
  //if last beat and the one before are active, add a beam to the left
  if (events[events.length - 1] === 1 && events[events.length - 2] === 1) {
    return (
      <div className="rp-note" style={{ marginRight: "17px" }}>
        {completeNotes[beamCodeType]}
      </div>
    );
  }

  //if only last beat is active, add a flag
  if (events[events.length - 1] === 1 && events[events.length - 2] === 0) {
    return (
      <div className="rp-note" style={{ marginRight: "17px" }}>
        {completeNotes.beamless}
        <div className="rp-eighthflag">{flagCodes[beamCodeType].up}</div>
      </div>
    );
  }

  //if the current beat is a rest, push a rest

  if (events[events.length - 1] === 0) {
    return <div className="rp-rest">{restCodes[beamCodeType]}</div>;
  }

  return null;
};

// render beamless black notes
// export const renderBeamless = (i: number[]) => {
//   i.forEach((note: number) => {
//     if (note === 1) {
//       return (
//         <div className="rp-note">
//           {completeNotes.beamless}
//           <div className="rp-spacer" />
//         </div>
//       );
//     }

//     if (note === 0) {
//       return <div className="rp-rest">{restCodes.quarter}</div>;
//     }
//   });
// };
