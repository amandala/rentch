import React from "react";

import styles from "./index.module.scss";

export const Button = ({ onClick, children, ...rest }) => {
  return (
    <button className={styles.Button} onClick={onClick} {...rest}>
      {children}
    </button>
  );
};

export const ButtonHollow = ({ onClick, children, ...rest }) => {
  return (
    <button className={styles.ButtonHollow} onClick={onClick} {...rest}>
      {children}
    </button>
  );
};

export const ButtonText = ({ onClick, children, ...rest }) => {
  return (
    <button className={styles.ButtonText} onClick={onClick} {...rest}>
      {children}
    </button>
  );
};
