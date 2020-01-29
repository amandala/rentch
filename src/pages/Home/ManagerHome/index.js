import React from "react";
import { useAuth0 } from "../../../react-auth0-spa";

import { HeadingLarge } from "../../../components/Heading";

import Notifications from "../Notifications";

import styles from "./index.module.scss";

const ManagerHome = ({ properties }) => {
  const { user } = useAuth0();

  return (
    <div className={styles.Home}>
      <div className={styles.Greeting}>
        <HeadingLarge>Welcome, {user.givenName}</HeadingLarge>
      </div>
      <div>
        <Notifications properties={properties} />
      </div>
    </div>
  );
};

export default ManagerHome;
