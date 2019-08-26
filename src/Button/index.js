import React from "react";

import "./index.scss";

export const Button = ({ onClick, children }) => {
  return (
    <button className="Button" onClick={onClick}>
      {children}
    </button>
  );
};

export const ButtonHollow = ({ onClick, children }) => {
  return (
    <button className="ButtonHollow" onClick={onClick}>
      {children}
    </button>
  );
};
