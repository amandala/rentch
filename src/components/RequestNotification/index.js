import React from "react";

import { Link } from "react-router-dom";

import { HeadingXSmall } from "../Heading";

import styles from "./index.module.scss";

import { getFormattedDate } from "../../helpers/getFormattedDate";

const RequestNotification = ({ request }) => {
  return (
    <Link to={`/request/${request.sys.id}`} className={styles.Wrapper}>
      <span>
        <HeadingXSmall className={styles.Date}>
          {getFormattedDate({ date: request.sys.updatedAt })}
        </HeadingXSmall>
        <span className={styles.Subject}>
          {request.fields.property.fields.name}
        </span>
      </span>
      <div className={styles.Status}>
        <span>{request.fields.status}</span>
        <span>{request.fields.type}</span>
      </div>
    </Link>
  );
};

export default RequestNotification;
