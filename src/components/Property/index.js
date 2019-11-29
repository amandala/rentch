import React from "react";
import { Redirect } from "react-router-dom";
import { getPropertyGreeting } from "../../helpers/user";
import { getFormattedDay } from "../../helpers/getFormattedDate";
import { HeadingSmall, Text } from "../Heading";

import styles from "./index.module.scss";

const Property = ({ property }) => {
  const getImgUrl = photo => photo.fields.file.url.split("//")[1];

  return (
    <div className={styles.Wrapper}>
      <div>
        <img
          className={styles.Image}
          style={{ width: "333px", height: "auto" }}
          src={`https:${property.fields.photos[0].fields.file.url}`}
        />
      </div>
      <div className={styles.Details}>
        <HeadingSmall>{property.fields.name}</HeadingSmall>
        <Text>Monthly rent: ${property.fields.monthlyRent}</Text>
        <Text>
          Lease Expiry: {getFormattedDay(property.fields.leaseExpiry)}
        </Text>
        <Text>Landlord: {property.fields.landlord.fields.name}</Text>
        <Text>Managed by: {property.fields.manager.fields.name}</Text>
      </div>
    </div>
  );
};

export default Property;
