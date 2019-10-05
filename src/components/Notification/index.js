import React from "react";
import moment from "moment";

import { useStateValue } from "../../StateProvider";

import styles from "./index.module.scss";

const Notification = ({ notification }) => {
  const [{ userData }] = useStateValue();

  const date = Date.parse(notification.fields.date);
  const formattedDate = moment(date).format("ll");
  const formattedTime = moment(date).format("LT");

  const isCreator = notification.fields.creator.fields.email === userData.email;

  return (
    <div className={styles.Wrapper} key={notification.fields.date}>
      <span className={styles.Date}>
        {formattedDate} @ {formattedTime}
      </span>
      <span className={styles.Subject}>{notification.fields.subject}</span>
      <span>{`${isCreator ? "Outgoing " : "Incomming "}${
        notification.fields.type
      }`}</span>
    </div>
  );
};

export default Notification;
