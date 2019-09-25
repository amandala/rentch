import React from "react";

import styles from "./index.module.scss";

export const Button = ({ onClick, children }) => {
  return (
    <button className={styles.Button} onClick={onClick}>
      {children}
    </button>
  );
};

export const ButtonHollow = ({ onClick, children }) => {
  return (
    <button className={styles.ButtonHollow} onClick={onClick}>
      {children}
    </button>
  );
};
