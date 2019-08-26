import React from "react";
import { Redirect } from "react-router-dom";
import { getPropertyGreeting } from "../helpers/user";
import { HeadingMedium, HeadingSmall } from "../Heading";
import { Button } from "../Button";

import "./index.scss";

const Property = ({ property }) => {
  const getImgUrl = photo => photo.fields.file.url.split("//")[1];
  const [navigateToRequestForm, setNavigateToRequestForm] = React.useState();

  if (navigateToRequestForm) {
    return <Redirect to="/request" />;
  }

  console.log(property);

  return (
    <div className="Wrapper">
      <HeadingMedium>{property.fields.name}</HeadingMedium>
      <img
        style={{ width: "333px", height: "auto" }}
        src={`https:${property.fields.photos[0].fields.file.url}`}
      />
      <HeadingSmall>Monthly rent: ${property.fields.monthlyRent}</HeadingSmall>
      <HeadingSmall>
        Landlord: {property.fields.landlord.fields.name}
      </HeadingSmall>
      <Button onClick={() => setNavigateToRequestForm(true)}>
        Request repair
      </Button>
    </div>
  );
};

export default Property;
