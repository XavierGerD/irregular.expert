import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import MathJax from "react-mathjax";
import { selectDescriptions, selectOctaveSize } from "../../reducer/selectors";
import {
  handleSetDescription,
  handleSetEqualTemperament,
} from "../../reducer/slice";

const EqualTemperamentSelector = () => {
  const dispatch = useDispatch();
  const descriptions = useSelector(selectDescriptions);
  const octaveSize = useSelector(selectOctaveSize);

  const onClick = React.useCallback(() => {
    dispatch(
      handleSetDescription({
        path: "equal",
        value: !descriptions["equal"],
      })
    );
  }, [dispatch, descriptions]);

  const onSetTemperament = React.useCallback(() => {
    dispatch(handleSetEqualTemperament({ division: octaveSize }));
  }, [octaveSize]);

  return (
    <div>
      <div className="temperament-selector">
        <div
          className={descriptions.equal ? "arrowdown" : "arrowright"}
          id="equal"
          onClick={onClick}
        />
        <label htmlFor="12-et">12 Tone Equal Temperament</label>
        <input
          id="12-et"
          type="radio"
          className="radiobutton"
          name="temperamentSelect"
          onChange={onSetTemperament}
          defaultChecked={true}
        />
      </div>
      <div
        className="description-box"
        style={{
          display: descriptions.equal ? "block" : "none",
        }}
      >
        <MathJax.Provider>
          Equal temperament is obtained by making all half-steps (semitones)
          equal. In 12-tone equal temperament, the distance between all minor
          seconds is {<MathJax.Node inline formula={"\\sqrt[12] 2"} />} or{" "}
          {<MathJax.Node inline formula={"\\approx 1.059463"} />}. While this
          allows all keys to be equally tempered, it has the tradeoff of
          preventing all intervals except the octave and unison from being
          perfectly just.
        </MathJax.Provider>
      </div>
    </div>
  );
};

export default EqualTemperamentSelector;
