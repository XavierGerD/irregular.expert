import React from "react";
import { useDispatch } from "react-redux";

import { handleSetEqualTemperament } from "../reducer/reducer";
import { synth } from "../reducer/reducer";
import BlackNotes from "./PianoKeys/BlackNotes";
import EqualTemperamentSelector from "./TemperamentSelectors/EqualTemperamentSelector";
import GlobalDetune from "./GlobalDetune";
import JustTemperamentSelector from "./TemperamentSelectors/JustTemperamentSelector";
import MeantoneTemperamentSelector from "./TemperamentSelectors/MeantoneTemperamentSelector";
import PythagoreanTemperamentSelector from "./TemperamentSelectors/PythagoreanTemperamentSelector";
import ReleaseAllButton from "./ReleaseAllButton";
import WaveSelector from "./WaveSelector";
import WhiteNotes from "./PianoKeys/WhiteNotes";

import "./Detune.css";

const Detune = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(handleSetEqualTemperament({ division: 12 }));
    return () => {
      synth.releaseAll();
    };
  }, []);

  return (
    <div className="detune-container">
      <div>
        <div className="instructions">
          This app lets you play around with different temperaments. Click on
          the arrow to reveal a description of each tuning.
        </div>
        <BlackNotes />
        <WhiteNotes />
        <div className="detune-selector">
          <WaveSelector />
          <EqualTemperamentSelector />
          <JustTemperamentSelector />
          <PythagoreanTemperamentSelector />
          <MeantoneTemperamentSelector />
          <GlobalDetune />
          <ReleaseAllButton />
        </div>
      </div>
    </div>
  );
};

export default Detune;
