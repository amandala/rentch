import React from "react";
import { getFormattedDay } from "../../helpers/getFormattedDate";
import { ButtonLink } from "../../components/Button";
import { HeadingMedium, HeadingSmall } from "../Type";
import { useStateValue } from "../../StateProvider";

import styles from "./index.module.scss";

type PropTypes = {
  property: any,
  showImage?: Boolean,
  userRole: "landlord" | "tenant" | "manager"
};

const PropertyDetails = ({ property, showImage, userRole }: PropTypes) => {
  const [{}, dispatch] = useStateValue();

  React.useEffect(() => {
    if (dispatch && property) {
      dispatch({
        type: "SET_PROPERTIES",
        data: [property]
      });
      dispatch({
        type: "SET_USER_ROLE",
        data: userRole
      });
    }
  }, [dispatch, property, userRole]);

  if (!property || !property.fields) {
    return null;
  }

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
        {property.fields && property.fields.name ? (
          <div className={styles.Heading}>
            <HeadingMedium>{property.fields.name}</HeadingMedium>
            <HeadingSmall>
              Lease Expiry: {getFormattedDay(property.fields.leaseExpiry)}
            </HeadingSmall>
          </div>
        ) : null}
        {userRole === "tenant" ? (
          <HeadingSmall>
            Monthly rent: ${property.fields.monthlyRent}
          </HeadingSmall>
        ) : null}

        {userRole !== "tenant" && property.fields.tenant ? (
          <HeadingSmall>
            Tenant:{" "}
            {property.fields.tenant[0].fields.name
              ? property.fields.tenant[0].fields.name
              : ""}
          </HeadingSmall>
        ) : null}
        {userRole !== "landlord" && property.fields.landlord ? (
          <HeadingSmall>
            Landlord:{" "}
            {property.fields.landlord.fields.name
              ? property.fields.landlord.fields.name
              : ""}
          </HeadingSmall>
        ) : null}
        {userRole !== "manager" && property.fields.manager ? (
          <HeadingSmall>
            Managed by:{" "}
            {property.fields.manager.fields.name
              ? property.fields.manager.fields.name
              : ""}
          </HeadingSmall>
        ) : null}
      </div>
      {userRole === "tenant" ? (
        <div className={styles.GetHelp}>
          <ButtonLink to="/request">Get Help</ButtonLink>
        </div>
      ) : null}
    </div>
  );
};

export default PropertyDetails;
