import React from "react";
import { Redirect } from "react-router-dom";

import { getPropertyGreeting } from "../../../helpers/user";
import { HeadingMedium, HeadingSmall } from "../../../components/Heading";

import styles from "./index.module.scss";

const Property = ({ property }) => {
  const getImgUrl = photo => photo.fields.file.url.split("//")[1];

  return (
    <div className={styles.Wrapper}>
      <div>
        <HeadingMedium>{property.fields.name}</HeadingMedium>
        <img
          style={{ width: "333px", height: "auto" }}
          src={`https:${property.fields.photos[0].fields.file.url}`}
        />
      </div>
      <div className={styles.Details}>
        <HeadingSmall>
          Monthly rent: ${property.fields.monthlyRent}
        </HeadingSmall>
        <HeadingSmall>
          Landlord: {property.fields.landlord.fields.name}
        </HeadingSmall>
      </div>
    </div>
  );
};

export default Property;
