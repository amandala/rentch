import React from "react";

import { Link } from "react-router-dom";

import { HeadingXSmall, HeadingSmall } from "../Type";
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
          <Pill className={styles.Pill} status={request.fields.status} />
        </HeadingXSmall>

        <HeadingSmall className={styles.TypeWrapper}>
          <span>{getPrettyRequestType(request.fields.type)}</span>
          <div className={styles.Dash}> - </div>
          <span>{request.fields.property.fields.name}</span>
        </HeadingSmall>
      </div>
    </Link>
  );
};

export default RequestNotification;
