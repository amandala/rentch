import React from "react";

import styles from "./index.module.scss";

const NoProperties = () => {
  return (
    <div className={styles.Wrapper}>
      <div className={styles.Heart}>❥</div>
      <div className={styles.Message}>
        <h1>Rentch loves you</h1>
        <p>
          We're sorry! There's no properties configured for your user account
          yet.
        </p>
        <p>
          Please email{" "}
          <a className={styles.Link} href="mailto:help@rentch.ca">
            help@rentch.ca
          </a>{" "}
          and we will get it sorted.
        </p>
      </div>
    </div>
  );
};

export default NoProperties;
