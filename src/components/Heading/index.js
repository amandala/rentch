import React from "react";
import cx from "classnames";

import styles from "./index.module.scss";

export const HeadingLarge = ({ children }) => {
  return (
    <h1 className={cx(styles.Heading, styles.HeadingLarge)}>{children}</h1>
  );
};

export const HeadingMedium = ({ children }) => {
  return (
    <h2 className={cx(styles.Heading, styles.HeadingMedium)}>{children}</h2>
  );
};

export const HeadingSmall = ({ children }) => {
  return (
    <h3 className={cx(styles.Heading, styles.HeadingSmall)}>{children}</h3>
  );
};

export const HeadingXSmall = ({ children }) => {
  return (
    <h4 className={cx(styles.Heading, styles.HeadingXSmall)}>{children}</h4>
  );
};

export const Text = ({ children, className }) => {
  return <p className={cx(styles.Text, className)}>{children}</p>;
};
