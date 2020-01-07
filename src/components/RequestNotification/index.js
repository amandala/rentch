import React from "react";

import { Link } from "react-router-dom";

import { HeadingXSmall } from "../Heading";
import Pill from "../Pill";

import styles from "./index.module.scss";

import { getFormattedDate } from "../../helpers/getFormattedDate";

const getPrettyRequestType = type => {
  switch (type) {
    case "plumbing":
      return "Plumbing repair";
    case "appliance":
      return "Appliance repair";
    case "heat":
      return "Heating repair";
    default:
      return "General request";
  }
};

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
