import React from "react";
import { useAuth0 } from "../../../react-auth0-spa";

import PropertyDetails from "../../../components/PropertyDetails";
import { HeadingSmall, HeadingLarge } from "../../../components/Type";
import Notifications from "../Notifications";

import styles from "./index.module.scss";

const LandlordHome = ({ properties }) => {
  const { user } = useAuth0();

  return (
    <div className={styles.Home}>
      <div className={styles.Greeting}>
        <HeadingLarge>Welcome, {user.nickname}</HeadingLarge>
      </div>
      <div className={styles.Notifications}>
        <Notifications properties={properties} />
      </div>
      <div>
        <HeadingSmall>Your Properties</HeadingSmall>
        <div className={styles.Properties}>
          {properties.map(property => (
            <div key={property.sys.id} className={styles.Property}>
              <PropertyDetails
                userRole="landlord"
                key={property.sys.id}
                property={property}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LandlordHome;
