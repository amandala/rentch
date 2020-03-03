import React from "react";
import { getFormattedDate } from "../../../helpers/getFormattedDate";

import { Text, HeadingSmall, HeadingXSmall } from "../../../components/Type";

import styles from "./index.module.scss";

const Notificaiton = ({ date, subject, message }) => {
  return (
    <div className={styles.Notification}>
      <span>
        <HeadingXSmall>{getFormattedDate(date)}</HeadingXSmall>
        <HeadingSmall>{subject}</HeadingSmall>
      </span>
      <Text>{message || "No message was provided"}</Text>
    </div>
  );
};

export default Notificaiton;
