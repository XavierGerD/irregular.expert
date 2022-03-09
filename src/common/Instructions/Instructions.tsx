import * as React from "react";

import "./Instructions.css";

interface IInstructionsProps {
  instructions: string[];
}

const Instructions = ({ instructions }: IInstructionsProps) => (
  <div>
    {instructions.map((instruction: string) => (
      <div className="instructions">{instruction}</div>
    ))}
  </div>
);

export default Instructions;
