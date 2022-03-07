import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import MathJax from "react-mathjax";

import {
  selectCurrentTemperament,
  selectDescriptions,
  selectMeantoneTemperamentStartingPitch,
} from "../../reducer/selectors";
import {
  handleSetDescription,
  handleSetMeantoneTemperamentStartingPitch,
  handleSetRatioBased,
} from "../../reducer/slice";
import { PitchClasses } from "../../../Data";
import StartingPitchSelector from "./StartingPitchSelector";

const MeantoneTemperamentSelector = () => {
  const dispatch = useDispatch();
  const descriptions = useSelector(selectDescriptions);
  const tonic = useSelector(selectMeantoneTemperamentStartingPitch);
  const currentTemperament = useSelector(selectCurrentTemperament);

  const onSelectTemperament = React.useCallback(() => {
    dispatch(
      handleSetRatioBased({
        tonic,
        temperamentName: "quarterMeantone",
      })
    );
  }, [tonic, dispatch]);

  const onSelectStartingPitch = React.useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const tonic = event.target.value as PitchClasses;
      dispatch(handleSetMeantoneTemperamentStartingPitch({ tonic }));
      dispatch(
        handleSetRatioBased({
          tonic,
          temperamentName: "quarterMeantone",
        })
      );
    },
    [dispatch, onSelectTemperament]
  );

  const onClick = React.useCallback(() => {
    dispatch(
      handleSetDescription({
        path: "quarterMeantone",
        value: !descriptions["quarterMeantone"],
      })
    );
  }, [dispatch, descriptions]);

  const id = "meantone-temperament";

  return (
    <div>
      <div className="temperament-selector">
        <div
          className={descriptions.quarterMeantone ? "arrowdown" : "arrowright"}
          id="quarterMeantone"
          onClick={onClick}
        />
        <label htmlFor={id}>1/4 Comma Meantone </label>
        <StartingPitchSelector
          disabled={currentTemperament !== "quarterMeantone"}
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
          display: descriptions.quarterMeantone ? "block" : "none",
        }}
      >
        <MathJax.Provider>
          Quarter Comma Meantone is an attempt at mitigating the loss of purity
          in major thirds thirds caused by the width of the fifths in
          Pythagorean tuning. Indeed, when fifths are tuned to just intervals,
          like in Pythagorean tuning, major thirds are stretched. It is
          impossible to have both pure major thirds and pure perfect fifths.
          Hence, by reducing the size of fifths, it is possible to achieve pure
          thirds. These new fifths are obtained using the formula{" "}
          {<MathJax.Node inline formula={"(3/2) * (80/81)^{1/4}"} />} or{" "}
          {<MathJax.Node inline formula={"\\approx 1.49535"} />}.
        </MathJax.Provider>
      </div>
    </div>
  );
};

export default MeantoneTemperamentSelector;
