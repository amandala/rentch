import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import { useStateValue } from "../StateProvider";

import styles from "./index.module.css";

const Login = () => {
  const [error, setError] = useState(null);

  const [{ loggedIn }, dispatch] = useStateValue();

  if (loggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <div className={styles.Login}>
      <div>
        {error ? <p>something went wrong</p> : null}
        <h1>Welcome to Rentch, please login to continue</h1>
        <GoogleLogin
          clientId="509100598048-ahu311l4ugtmf68q093g8po4oqubc38s.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={data => {
            dispatch({
              type: "login",
              data: data.profileObj
            });

            localStorage.setItem("profile", JSON.stringify(data.profileObj));
          }}
          onFailure={e => {
            console.log(e);
          }}
          cookiePolicy={"single_host_origin"}
        />
      </div>
    </div>
  );
};

export default Login;
