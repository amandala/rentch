import React from "react";

import { HeadingLarge, Text } from "../../../components/Type";

import styles from "./index.module.scss";

const ErrorPage = ({ children }) => {
  return (
    <div className={styles.Wrapper}>
      <HeadingLarge className={styles.Heart}>❥</HeadingLarge>
      <div className={styles.Message}>
        <HeadingLarge>Rentch loves you!</HeadingLarge>
        <div>{children}</div>
        <Text>
          Please email{" "}
          <a className={styles.Link} href="mailto:help@rentch.ca">
            help@rentch.ca
          </a>{" "}
          and we will get it sorted.
        </Text>
      </div>
    </div>
  );
};

export default ErrorPage;
