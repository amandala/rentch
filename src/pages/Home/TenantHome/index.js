import React, { useEffect } from "react";
import { useAuth0 } from "../../../react-auth0-spa";
import { useStateValue } from "../../../StateProvider";

import { ButtonLink } from "../../../components/Button";
import Property from "../../../components/Property";
import { HeadingLarge } from "../../../components/Type";
import Notifications from "../Notifications";

import styles from "./index.module.scss";

const TenantHome = ({ property }) => {
  const [state, dispatch] = useStateValue();
  const { user } = useAuth0();

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
        <HeadingLarge>Welcome, {user.nickname}</HeadingLarge>
        <div className={styles.GetHelp}>
          <ButtonLink url="request">Get Help</ButtonLink>
        </div>
      </div>
      <div className={styles.PropertyDetails}>
        <Property property={property} />
        <div className={styles.Notifications}>
          <Notifications properties={[property]} />
        </div>
      </div>
    </div>
  );
};

export default TenantHome;
