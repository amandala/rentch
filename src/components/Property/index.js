import React from "react";
import { getFormattedDay } from "../../helpers/getFormattedDate";
import { HeadingSmall, Text } from "../Type";

import styles from "./index.module.scss";

const Property = ({ property }) => {
  return (
    <div className={styles.Wrapper}>
      <div
        className={styles.Image}
        style={{
          backgroundImage: `url(${property.fields.photos[0].fields.file.url})`
        }}
      ></div>
      <div className={styles.Details}>
        <div className={styles.Padding}>
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
    </div>
  );
};

export default Property;
