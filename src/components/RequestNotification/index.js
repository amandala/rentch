import React, { useState } from "react";
import { useModal } from "react-modal-hook";

import { Link } from "react-router-dom";

import styles from "./index.module.scss";

import { getFormattedDate } from "../../helpers/getFormattedDate";

const RequestNotification = ({ request }) => {
  return (
    <Link to={`/request/${request.sys.id}`} className={styles.Wrapper}>
      <span
        className={styles.Subject}
      >{`${request.fields.status} ${request.fields.type} ${request.fields.property.fields.name}`}</span>
      <span className={styles.Date}>
        {getFormattedDate({ date: request.fields.timestamp })}
      </span>
    </Link>
  );
};

export default RequestNotification;
