import React from "react";

import { useStateValue } from "../../../StateProvider";

import { HeadingLarge } from "../../../components/Heading";

import Notifications from "../Notifications";

import styles from "./index.module.scss";

const ManagerHome = ({ properties }) => {
  const [{ userData }] = useStateValue();

  return (
    <div className={styles.Home}>
      <div className={styles.Greeting}>
        <HeadingLarge>Welcome, {userData.givenName}</HeadingLarge>
      </div>
      <div>
        <Notifications properties={properties} />
      </div>
    </div>
  );
};

export default ManagerHome;
