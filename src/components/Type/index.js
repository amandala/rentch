import React from "react";
import cx from "classnames";

import styles from "./index.module.scss";

export const HeadingLarge = ({ children, className = "" }) => {
  return (
    <h1 className={cx(styles.Heading, styles.HeadingLarge, className)}>
      {children}
    </h1>
  );
};

export const HeadingMedium = ({ children, className }) => {
  return (
    <h2 className={cx(styles.Heading, styles.HeadingMedium, className)}>
      {children}
    </h2>
  );
};

export const HeadingSmall = ({ children, className }) => {
  return (
    <h3 className={cx(styles.Heading, styles.HeadingSmall, className)}>
      {children}
    </h3>
  );
};

export const HeadingXSmall = ({ children, className }) => {
  return (
    <h4 className={cx(styles.Heading, styles.HeadingXSmall, className)}>
      {children}
    </h4>
  );
};

export const Text = ({ children, className }) => {
  return <p className={cx(styles.Text, className)}>{children}</p>;
};
