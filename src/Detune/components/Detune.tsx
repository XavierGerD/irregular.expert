import * as React from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  handleGlobalDetune,
  handleSetEqualTemperament,
} from "../reducer/slice";
import EqualTemperamentSelector from "./TemperamentSelectors/EqualTemperamentSelector";
import GlobalDetune from "../../common/GlobalDetune/GlobalDetune";
import JustTemperamentSelector from "./TemperamentSelectors/JustTemperamentSelector";
import MeantoneTemperamentSelector from "./TemperamentSelectors/MeantoneTemperamentSelector";
import PythagoreanTemperamentSelector from "./TemperamentSelectors/PythagoreanTemperamentSelector";
import ReleaseAllButton from "../../common/ReleaseAllButton/ReleaseAllButton";
import WaveSelector from "../../common/WaveSelector/WaveSelector";
import PianoKeys from "../../common/PianoKeys/PianoKeys";
import { selectGlobalDetune, selectPitchValues } from "../reducer/selectors";
import { synth } from "../../common/synth";
import Instructions from "../../common/Instructions/Instructions";
import { instructions } from "../instructions";

import "./Detune.css";
import VolumeAdjust from "../../common/VolumeAdjust/VolumeAdjust";

const Detune = () => {
  const dispatch = useDispatch();
  const globalDetune = useSelector(selectGlobalDetune);

  const onChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(handleGlobalDetune({ value: parseInt(event.target.value) }));
    },
    [dispatch]
  );

  React.useEffect(() => {
    dispatch(handleSetEqualTemperament({ division: 12 }));
    return () => {
      synth.releaseAll();
    };
  }, []);

  return (
    <div className="detune-container">
      <div>
        <Instructions instructions={instructions} />
        <PianoKeys selectNotes={selectPitchValues} />
        <div className="detune-selector">
          <WaveSelector />
          <ReleaseAllButton />
          <div>
            <div className="volume-adjust">
              <VolumeAdjust />
            </div>
            <div>
              <EqualTemperamentSelector />
              <JustTemperamentSelector />
              <PythagoreanTemperamentSelector />
              <MeantoneTemperamentSelector />
              <GlobalDetune globalDetune={globalDetune} onChange={onChange} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detune;
