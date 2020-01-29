import React, { useEffect } from "react";

import { useStateValue } from "../../../StateProvider";

import { ButtonLink } from "../../../components/Button";
import Property from "../../../components/Property";
import { HeadingLarge, HeadingSmall } from "../../../components/Heading";
import Notifications from "../Notifications";

import styles from "./index.module.scss";

const TenantHome = ({ property }) => {
  const [{ userData }, dispatch] = useStateValue();

  useEffect(() => {
    dispatch({
      type: "SET_PROPERTIES",
      data: [property]
    });
    dispatch({
      type: "SET_USER_ROLE",
      data: "tenant"
    });
  }, [dispatch, property]);

  return (
    <div className={styles.Home}>
      <div className={styles.Greeting}>
        {/* <HeadingLarge>Welcome, {userData.givenName}</HeadingLarge> */}
        <ButtonLink url="request">Get Help</ButtonLink>
      </div>
      <div className={styles.PropertyDetails}>
        <div>
          <HeadingSmall>Your Home</HeadingSmall>
          <div className={styles.Property}>
            <Property property={property} />
          </div>
        </div>
        <div className={styles.Notifications}>
          <Notifications properties={[property]} />
        </div>
      </div>
    </div>
  );
};

export default TenantHome;
