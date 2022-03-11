import * as React from "react";
import { useDispatch, useSelector } from "react-redux";

import Metronome from "../../../Metronome/components/Metronome";
import PianoKeys from "../../../common/PianoKeys/PianoKeys";
import {
  selectTuning,
  selectPitchValues,
  selectOctave,
} from "../../../Drone/reducer/selectors";
import { handleSetOctave, handleSetTuning } from "../../reducer/slice";
import OctaveSelector from "../../../common/OctaveSelector/OctaveSelector";
import WaveSelector from "../../../common/WaveSelector/WaveSelector";
import VolumeAdjust from "../../../common/VolumeAdjust/VolumeAdjust";
import Instructions from "../../../common/Instructions/Instructions";
import { instructions } from "../Simple/instructions";
import ReleaseAllButton from "../../../common/ReleaseAllButton/ReleaseAllButton";
import { releaseAll } from "../../../common/synth";
import GlobalDetune from "../../../common/GlobalDetune/GlobalDetune";

import "./Simple.css";

const Simple = () => {
  const dispatch = useDispatch();
  const globalDetune = useSelector(selectTuning);
  const selectedOctave = useSelector(selectOctave);

  const onChangeTuning = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(handleSetTuning({ tuning: parseInt(event.target.value) }));
    },
    [dispatch]
  );

  const onChangeOctave = React.useCallback(
    (octave: number) => () => {
      dispatch(handleSetOctave({ octave }));
    },
    [dispatch]
  );

  React.useEffect(() => {
    dispatch(handleSetTuning({ tuning: 440 }));
    return () => {
      releaseAll();
    };
  }, [dispatch]);

  return (
    <div className="drone-container">
      <Instructions instructions={instructions} />

      <div className="drone-container">
        <div className="simple-container">
          <div className="select-container">
            <OctaveSelector
              selectedOctave={selectedOctave}
              onChange={onChangeOctave}
            />
            <GlobalDetune
              globalDetune={globalDetune}
              onChange={onChangeTuning}
            />
          </div>
          <Metronome />
        </div>
        <WaveSelector />
      </div>

      <div className="simple-container">
        <VolumeAdjust />
        <PianoKeys
          showFrequency={false}
          monophonic={true}
          selectNotes={selectPitchValues}
        />
      </div>
      <ReleaseAllButton />
    </div>
  );
};

export default Simple;
