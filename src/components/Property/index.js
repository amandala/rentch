import React from "react";
import { getFormattedDay } from "../../helpers/getFormattedDate";
import { HeadingMedium, Text, HeadingSmall } from "../Type";

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
          <HeadingMedium>{property.fields.name}</HeadingMedium>
          <HeadingSmall>
            Monthly rent: ${property.fields.monthlyRent}
          </HeadingSmall>
          {property.fields.leaseExpiry ? (
            <HeadingSmall>
              Lease Expiry: {getFormattedDay(property.fields.leaseExpiry)}
            </HeadingSmall>
          ) : null}
          {console.log(property)}
          <HeadingSmall>
            Landlord: {property.fields.landlord.fields.name}
          </HeadingSmall>
          {/* <Text>Tenant: {property.fields.tenant[0].fields.name}</Text> */}
          <HeadingSmall>
            Managed by: {property.fields.manager.fields.name}
          </HeadingSmall>
        </div>
      </div>
    </div>
  );
};

export default Property;
