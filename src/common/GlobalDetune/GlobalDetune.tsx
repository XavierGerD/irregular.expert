import * as React from "react";

interface IGlobalDetuneProps {
  globalDetune: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const GlobalDetune = ({ globalDetune, onChange }: IGlobalDetuneProps) => {
  const id = "global-detune-input";

  return (
    <div className="temperament-selector">
      <label htmlFor={id}>Global detune (cents +/-)</label>
      <input
        id={id}
        className="rp-inputBox global-detune-input"
        type="input"
        value={globalDetune}
        onChange={onChange}
      />
    </div>
  );
};

export default GlobalDetune;
