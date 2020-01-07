import React from "react";
import cx from "classnames";

import styles from "./index.module.scss";

const Pill = ({ status }) => {
  return (
    <span
      className={cx(styles.Pill, {
        [styles.PillFollowUp]: status === "followup",
        [styles.PillRepair]: status === "repair",
        [styles.PillFixed]: status === "fixed"
      })}
    >
      {status}
    </span>
  );
};

export default Pill;
