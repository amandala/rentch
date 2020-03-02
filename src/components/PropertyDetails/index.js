import React from "react";
import { getFormattedDay } from "../../helpers/getFormattedDate";
import { HeadingMedium, HeadingSmall } from "../Type";

import styles from "./index.module.scss";

type PropTypes = {
  property: any,
  showImage?: Boolean,
  userRole: "landlord" | "tenant" | "manager"
};

const PropertyDetails = ({ property, showImage, userRole }: PropTypes) => {
  return (
    <div className={styles.Wrapper}>
      {showImage ? (
        <div
          className={styles.Image}
          style={{
            backgroundImage: `url(${property.fields.photos[0].fields.file.url})`
          }}
        />
      ) : null}
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
          {userRole !== "tenant" && property.fields.tenant ? (
            <HeadingSmall>
              Tenant: {property.fields.tenant[0].fields.name}
            </HeadingSmall>
          ) : null}
          {userRole !== "landlord" && property.fields.landlord ? (
            <HeadingSmall>
              Landlord: {property.fields.landlord.fields.name}
            </HeadingSmall>
          ) : null}
          {userRole !== "manager" ? (
            <HeadingSmall>
              Managed by: {property.fields.manager.fields.name}
            </HeadingSmall>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
