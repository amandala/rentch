import React from "react";
import cx from "classnames";

import styles from "./index.module.scss";

const Pill = ({ status }) => {
  return (
    <span
      className={cx(styles.Pill, {
        [styles.PillRed]: status === "followup",
        [styles.PillYellow]: status === "repair",
        [styles.PillGreen]: status === "fixed"
      })}
    >
      {status}
    </span>
  );
};

export default Pill;
