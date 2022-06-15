import React from "react";
import "./namesInput.css";

function Index({ data, setChosenAgent }) {
  return (
    <div className="names-input">
      {data.map(({ name }, i) => {
        return (
          <span key={`${i}`}>
            <input
              className="names-radio"
              type="radio"
              name="userinput"
              id={name}
              onChange={() => setChosenAgent(i)}
            />
            <label className="for-names-radio" htmlFor={name}>
              <span data-hover={name}>{name}</span>
            </label>
          </span>
        );
      })}
    </div>
  );
}

export default Index;
