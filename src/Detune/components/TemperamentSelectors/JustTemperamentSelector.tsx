import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import MathJax from "react-mathjax";

import {
  selectCurrentTemperament,
  selectDescriptions,
  selectJustTemperamentStartingPitch,
} from "../../reducer/selectors";
import {
  handleSetDescription,
  handleSetJustTemperament,
  handleSetJustTemperamentStartingPitch,
} from "../../reducer/slice";
import { PitchClasse } from "../../../common/types";
import StartingPitchSelector from "./StartingPitchSelector";

const JustTemperamentSelector = () => {
  const dispatch = useDispatch();
  const descriptions = useSelector(selectDescriptions);
  const currentTemperament = useSelector(selectCurrentTemperament);
  const justTemperamentStartingPitch = useSelector(
    selectJustTemperamentStartingPitch
  );

  const onSetJustTemperament = React.useCallback(() => {
    dispatch(handleSetJustTemperament());
  }, [dispatch]);

  const onSelectStartingPitch = React.useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const tonic = event.target.value as PitchClasse;
      dispatch(handleSetJustTemperamentStartingPitch({ tonic }));
      onSetJustTemperament();
    },
    [dispatch, onSetJustTemperament]
  );

  const onClick = React.useCallback(() => {
    dispatch(
      handleSetDescription({
        path: "just",
        value: !descriptions["just"],
      })
    );
  }, [dispatch, descriptions]);

  const id = "just-temperament";

  return (
    <div>
      <div className="temperament-selector">
        <div
          className={descriptions.just ? "arrowdown" : "arrowright"}
          id="just"
          onClick={onClick}
        />
        <label htmlFor={id}>Just Intonation in </label>
        <StartingPitchSelector
          disabled={currentTemperament !== "just"}
          onChange={onSelectStartingPitch}
          selectedValue={justTemperamentStartingPitch}
        />
        <input
          id={id}
          type="radio"
          className="radiobutton"
          name="temperamentSelect"
          onChange={onSetJustTemperament}
        />
      </div>
      <div
        className="description-box"
        style={{
          display: descriptions.just ? "block" : "none",
        }}
      >
        <MathJax.Provider>
          Just intonation is a temperament in which interval sizes are
          determined using small whole number ratios, such as{" "}
          {<MathJax.Node inline formula={"3:2"} />} (perfect fifth) or{" "}
          {<MathJax.Node inline formula={"4:3"} />} (perfect fourth). These
          intervals are mostly derived from the harmonic series. While this
          temperament allows one specific key to have all of its intervals
          perfectly just, it sacrifices consonance in all other keys, since it
          is mathematically impossible to have just intervals in every key at
          the same time. When selecting just inonation, you may also choose the
          key to which the intervals are tuned.
        </MathJax.Provider>
      </div>
    </div>
  );
};

export default JustTemperamentSelector;
