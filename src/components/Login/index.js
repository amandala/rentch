import React from "react";
import { Button } from "../Button";
import { useAuth0 } from "../../react-auth0-spa";
import { HeadingLarge, HeadingMedium, Text } from "../Type";

import styles from "./index.module.css";

const Login = () => {
  const { loading, error } = useAuth0();

  return (
    <div className={styles.Login}>
      <div>
        <HeadingLarge>
          Welcome to Rentch, please wait while we redirect you to login.
        </HeadingLarge>
        {loading ? <HeadingMedium>LOADING...</HeadingMedium> : null}
        {error ? (
          <div>
            <HeadingMedium>Oops!</HeadingMedium>
            <Text>
              Please email{" "}
              <a className={styles.Link} href="mailto:help@rentch.ca">
                help@rentch.ca
              </a>{" "}
              and we will get it sorted.
            </Text>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Login;
