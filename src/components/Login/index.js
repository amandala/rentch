import React from "react";
import { useAuth0 } from "../../react-auth0-spa";

import styles from "./index.module.css";

const Login = () => {
  const { loading, isAuthenticated, loginWithRedirect } = useAuth0();

  return (
    <div className={styles.Login}>
      <div>
        <h1>Welcome to Rentch, please login to continue</h1>
        {loading ? "LOADING..." : null}

        {!isAuthenticated && (
          <button onClick={() => loginWithRedirect({})}>Log in</button>
        )}
      </div>
    </div>
  );
};

export default Login;
