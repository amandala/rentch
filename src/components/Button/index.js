import React from "react";
import cx from "classnames";
import styles from "./index.module.scss";
import { Link } from "react-router-dom";

export const Button = ({ onClick, className, children, ...rest }) => {
  return (
    <button
      className={cx(styles.Button, className)}
      onClick={onClick}
      {...rest}
    >
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

export const ButtonLink = ({ onClick, className, children, to, ...rest }) => {
  return (
    <Link to={to}>
      <button
        className={cx(styles.Button, className)}
        onClick={onClick}
        {...rest}
      >
        {children}
      </button>
    </Link>
  );
};
