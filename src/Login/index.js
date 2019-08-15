import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { GoogleLogout, GoogleLogin } from "react-google-login";
import { useStateValue } from "../StateProvider";

import "./index.css";

const Login = () => {
  const [error, setError] = useState(null);

  const [{ loggedIn }, dispatch] = useStateValue();

  if (loggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <div className="Login">
      {loggedIn ? (
        <div>
          <p>Welcome to Rentch</p>
          <GoogleLogout
            clientId="509100598048-ahu311l4ugtmf68q093g8po4oqubc38s.apps.googleusercontent.com"
            buttonText="Logout"
            onLogoutSuccess={() =>
              dispatch({
                type: "logout"
              })
            }
          />
        </div>
      ) : (
        <div>
          {error ? <p>something went wrong</p> : null}
          <GoogleLogin
            clientId="509100598048-ahu311l4ugtmf68q093g8po4oqubc38s.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={data => {
              dispatch({
                type: "login",
                data: data.profileObj
              });
            }}
            onFailure={e => {
              console.log(e);
            }}
            cookiePolicy={"single_host_origin"}
          />
        </div>
      )}
    </div>
  );
};

export default Login;
