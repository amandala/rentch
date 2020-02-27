import React from "react";
import { Button } from "../Button";
import { useAuth0 } from "../../react-auth0-spa";

import styles from "./index.module.css";

const Login = () => {
  const { loading, loginWithRedirect } = useAuth0();

  return (
    <div className={styles.Login}>
      <div>
        <h1>Welcome to Rentch, please login to continue</h1>
        {loading ? "LOADING..." : null}
        <Button onClick={() => loginWithRedirect({})}>Log in</Button>
      </div>
    </div>
  );
};

export default Login;
