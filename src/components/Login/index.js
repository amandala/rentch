import React from "react";

import { useAuth0 } from "../../react-auth0-spa";
import ErrorScreen from "../ErrorScreen";
import { Text } from "../Type";

import styles from "./index.module.css";

const Login = () => {
  const { error } = useAuth0();

  return (
    <div className={styles.Login}>
      <div>
        {error ? (
          <ErrorScreen>
            <Text>An error ocurred attempting to authenticate.</Text>
          </ErrorScreen>
        ) : null}
      </div>
    </div>
  );
};

export default Login;
