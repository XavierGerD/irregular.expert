import * as React from "react";

import "./Instructions.css";

interface IInstructionsProps {
  instructions: string[];
  narrow?: boolean;
}

const Instructions = ({ instructions, narrow }: IInstructionsProps) => (
  <div>
    {instructions.map((instruction: string, index: number) => (
      <div key={index} className={"instructions" + (narrow ? "-narrow" : "")}>
        {instruction}
      </div>
    ))}
  </div>
);

export default Instructions;
