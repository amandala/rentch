import React from "react";
import { useAuth0 } from "../../../react-auth0-spa";

import { HeadingLarge } from "../../../components/Type";

import Notifications from "../Notifications";

import styles from "./index.module.scss";

const ManagerHome = ({ properties }) => {
  const { user } = useAuth0();
  console.log(user);

  return (
    <div className={styles.Home}>
      <div className={styles.Greeting}>
        <HeadingLarge>Welcome, {user.nickname}</HeadingLarge>
      </div>
      <div>
        <Notifications properties={properties} />
      </div>
    </div>
  );
};

export default ManagerHome;
