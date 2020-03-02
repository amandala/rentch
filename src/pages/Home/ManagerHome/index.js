import React from "react";
import { useAuth0 } from "../../../react-auth0-spa";
import { HeadingLarge } from "../../../components/Type";
import PropertyLinkList from "../../../components/PropertyLinkList";
import Notifications from "../../../components/Notifications";

import styles from "./index.module.scss";

const ManagerHome = ({ properties }) => {
  const { user } = useAuth0();
  properties.forEach(property => console.log(property));

  return (
    <div className={styles.Home}>
      <div className={styles.Greeting}>
        <HeadingLarge>Welcome, {user.nickname}</HeadingLarge>
      </div>
      <div className={styles.Dashboard}>
        <div className={styles.Properties}>
          <PropertyLinkList properties={properties} />
        </div>
        <div>
          <Notifications properties={properties} />
        </div>
      </div>
    </div>
  );
};

export default ManagerHome;
