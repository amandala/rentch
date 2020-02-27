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
      <span>
        <HeadingXSmall className={styles.Date}>
          {getFormattedDate({ date: request.sys.updatedAt })}
        </HeadingXSmall>
        <span className={styles.Subject}>
          {request.fields.property.fields.name} -{" "}
          {getPrettyRequestType(request.fields.type)}
        </span>
      </span>
      <div className={styles.Status}>
        <Pill status={request.fields.status} />
      </div>
    </Link>
  );
};

export default RequestNotification;
