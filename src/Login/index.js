import React, { useState } from "react";
import { GoogleLogout, GoogleLogin } from "react-google-login";
import { useStateValue } from "../StateProvider";

import "./index.css";

const Login = () => {
  const [error, setError] = useState(null);

  const [{ loggedIn }, dispatch] = useStateValue();

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
              console.log(data);
              dispatch({
                type: "login"
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
