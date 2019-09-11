import React from "react";
import { Redirect } from "react-router-dom";
import { getPropertyGreeting } from "../../helpers/user";
import { HeadingMedium, HeadingSmall } from "../../Heading";

import "./index.scss";

const Property = ({ property }) => {
  const getImgUrl = photo => photo.fields.file.url.split("//")[1];

  return (
    <div className="TenantPropertyWrapper">
      <div className="TenantPropertyName">
        <HeadingMedium>{property.fields.name}</HeadingMedium>
        <img
          style={{ width: "333px", height: "auto" }}
          src={`https:${property.fields.photos[0].fields.file.url}`}
        />
      </div>
      <div className="TenantPropertyDetails">
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
