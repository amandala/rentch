import React from "react";
import { getFormattedDay } from "../../helpers/getFormattedDate";
import { HeadingSmall, Text } from "../Type";

import styles from "./index.module.scss";

const Property = ({ property }) => {
  return (
    <div className={styles.Wrapper}>
      <div>
        <img
          className={styles.Image}
          style={{ width: "333px", height: "auto" }}
          src={`https:${property.fields.photos[0].fields.file.url}`}
          alt="Property"
        />
      </div>
      <div className={styles.Details}>
        <HeadingSmall>{property.fields.name}</HeadingSmall>
        <Text>Monthly rent: ${property.fields.monthlyRent}</Text>
        {property.fields.leaseExpiry ? (
          <Text>
            Lease Expiry: {getFormattedDay(property.fields.leaseExpiry)}
          </Text>
        ) : null}
        {console.log(property)}
        <Text>Landlord: {property.fields.landlord.fields.name}</Text>
        {/* <Text>Tenant: {property.fields.tenant[0].fields.name}</Text> */}
        <Text>Managed by: {property.fields.manager.fields.name}</Text>
      </div>
    </div>
  );
};

export default Property;
