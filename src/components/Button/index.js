import React from "react";

import styles from "./index.module.scss";
import { Link } from "react-router-dom";

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

export const ButtonLink = ({ onClick, children, to, ...rest }) => {
  return (
    <Link className={styles.Link} to={to}>
      <button className={styles.Button} onClick={onClick} {...rest}>
        {children}
      </button>
    </Link>
  );
};
