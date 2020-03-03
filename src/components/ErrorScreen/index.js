import React from "react";

import { HeadingLarge, Text } from "../Type";

import styles from "./index.module.scss";

const ErrorScreen = ({ children }) => {
  return (
    <div className={styles.Wrapper}>
      <HeadingLarge className={styles.Heart}>❥</HeadingLarge>
      <div className={styles.Message}>
        <HeadingLarge className={styles.Love}>Rentch loves you!</HeadingLarge>
        <div>{children}</div>
        <Text className={styles.Email}>
          If the problem persists, please email{" "}
          <a className={styles.Link} href="mailto:help@rentch.ca">
            help@rentch.ca
          </a>{" "}
          and we will get it sorted.
        </Text>
      </div>
    </div>
  );
};

export default ErrorScreen;
