import React from "react";
import { useAuth0 } from "../../../react-auth0-spa";

import Property from "../../../components/Property";
import { HeadingSmall, HeadingLarge } from "../../../components/Heading";
import Notifications from "../Notifications";

import styles from "./index.module.scss";

const LandlordHome = ({ properties }) => {
  const { user } = useAuth0();

  return (
    <div className={styles.Home}>
      <div className={styles.Greeting}>
        <HeadingLarge>Welcome, {user.givenName}</HeadingLarge>
      </div>
      <div className={styles.Notifications}>
        <Notifications properties={properties} />
      </div>
      <div>
        <HeadingSmall>Your Properties</HeadingSmall>
        <div className={styles.Properties}>
          {properties.map(property => (
            <div key={property.sys.id} className={styles.Property}>
              <Property key={property.sys.id} property={property} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LandlordHome;
