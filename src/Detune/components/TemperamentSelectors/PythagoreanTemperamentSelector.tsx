import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import MathJax from "react-mathjax";

import {
  selectCurrentTemperament,
  selectDescriptions,
  selectPythagoreanTemperamentStartingPitch,
} from "../../reducer/selectors";
import {
  handleSetDescription,
  handleSetPythagoreanTemperamentStartingPitch,
  handleSetRatioBased,
} from "../../reducer/slice";
import { PitchClasse } from "../../../common/types";
import StartingPitchSelector from "./StartingPitchSelector";

const PythagoreanTemperamentSelector = () => {
  const dispatch = useDispatch();
  const descriptions = useSelector(selectDescriptions);
  const tonic = useSelector(selectPythagoreanTemperamentStartingPitch);
  const currentTemperament = useSelector(selectCurrentTemperament);

  const onSelectTemperament = React.useCallback(() => {
    dispatch(
      handleSetRatioBased({
        tonic,
        temperamentName: "pythagorean",
      })
    );
  }, [tonic, dispatch]);

  const onSelectStartingPitch = React.useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const tonic = event.target.value as PitchClasse;
      dispatch(handleSetPythagoreanTemperamentStartingPitch({ tonic }));
      dispatch(
        handleSetRatioBased({
          tonic,
          temperamentName: "pythagorean",
        })
      );
    },
    [dispatch, onSelectTemperament]
  );

  const onClick = React.useCallback(() => {
    dispatch(
      handleSetDescription({
        path: "pythagorean",
        value: !descriptions["pythagorean"],
      })
    );
  }, [dispatch, descriptions]);

  const id = "pythagorean-temperament";

  return (
    <div>
      <div className="temperament-selector">
        <div
          className={descriptions.pythagorean ? "arrowdown" : "arrowright"}
          id="pythagorean"
          onClick={onClick}
        />
        <label htmlFor={id}>Pythagorean in </label>
        <StartingPitchSelector
          disabled={currentTemperament !== "pythagorean"}
          onChange={onSelectStartingPitch}
          selectedValue={tonic}
        />
        <input
          id={id}
          type="radio"
          className="radiobutton"
          name="temperamentSelect"
          onChange={onSelectTemperament}
        />
      </div>
      <div
        className="description-box"
        style={{
          display: descriptions.pythagorean ? "block" : "none",
        }}
      >
        <MathJax.Provider>
          Pythagorean tuning is a system in which all interval ratios are based
          on the perfect fifth {<MathJax.Node inline formula={"(3:2)"} />}. This
          is achieved by selecting a starting pitch, then going up the circle of
          fifths six times, and down the circle of fifths five times, tuning
          each consecutive fifth to the{" "}
          {<MathJax.Node inline formula={"3:2"} />} ratio. For example, starting
          on D:
          <div>
            E♭–B♭–F–C–G–
            <span style={{ fontWeight: 1000 }}>D</span>
            –A–E–B–F♯–C♯–G♯
          </div>
          When continuing the circle of fifths downwards to A♭, however, a
          problem arises: the A♭ is not perfectly enharmonic with the G♯ above.
          Indeed, both intervals are not a perfect fifth away{" "}
          {<MathJax.Node inline formula={"(3:2)"} />} , but rather G♯ is about{" "}
          {<MathJax.Node inline formula={"23.46"} />} cents (or a Pythagorean
          comma) above A♭. To remedy this, one of the fifths is left out. This
          means that when closing the circle of fifths, the very last fifth of
          the circle is flat by a Pythagorean comma. This interval is called the
          wolf fifth. The wolf fifth is usually located a tritone above the note
          for which the tuning is derived.
        </MathJax.Provider>
      </div>
    </div>
  );
};

export default PythagoreanTemperamentSelector;
