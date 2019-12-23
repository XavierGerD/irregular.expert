import React, { Component } from "react";

class Instructions extends Component {
  render = () => {
    return (
      <div className="rp-instructions">
        <div style={{ width: "800px" }}>
          <div style={{ fontWeight: "bold" }}>Instructions: </div>
          <div>Enter a tempo for the quarter note pulse.</div>
          <div>
            <span style={{ fontWeight: 600 }}>
              Select the number of repetition for each bar or grouping.{" "}
            </span>
            This represents the number of times you have to clap the rhythm in
            the first bar before it is replaced with the rhythm in the second
            bar and a new one is generated.
          </div>
          <div>
            <span style={{ fontWeight: 600 }}>
              Use the checkboxes to select the groupings you want to practice.
            </span>
            Selecting more than one will generate a random mix of values.
          </div>
          <div>
            <span style={{ fontWeight: 600 }}>
              Select the mode of operation:
            </span>
            <div>
              Bar means that clicks are played every quarter note. This gives
              you a reference within the bar to follow along with.
            </div>
            <div>
              Tuplet means only one click per bar, as if the figure was a tuplet
              equal to the numerator value of the time signature.
            </div>
          </div>
        </div>
      </div>
    );
  };
}

export default Instructions;
