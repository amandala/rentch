import React from "react";

import { Link } from "react-router-dom";

import { HeadingXSmall } from "../Type";
import Pill from "../Pill";

import styles from "./index.module.scss";

import { getFormattedDate } from "../../helpers/getFormattedDate";
import getPrettyRequestType from "../../helpers/getPrettyRequestType";

const RequestNotification = ({ request }) => {
  return (
    <Link to={`/request/${request.sys.id}`} className={styles.Wrapper}>
      <div className={styles.Content}>
        <HeadingXSmall className={styles.Date}>
          {getFormattedDate({ date: request.sys.updatedAt })}
        </HeadingXSmall>
        <div>{getPrettyRequestType(request.fields.type)}</div>
        <div>{request.fields.property.fields.name}</div>
        <Pill className={styles.Pill} status={request.fields.status} />
      </div>
    </Link>
  );
};

export default RequestNotification;
