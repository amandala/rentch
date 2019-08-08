import React, { useState } from "react";
import { GoogleLogout, GoogleLogin } from "react-google-login";

import "./index.css";

const Login = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState(null);

  const responseGoogle = response => {
    console.log(response);
  };

  return (
    <div className="Login">
      {isAuthenticated ? (
        <div>
          <p>Welcome to Rentch</p>
          <GoogleLogout
            clientId="509100598048-ahu311l4ugtmf68q093g8po4oqubc38s.apps.googleusercontent.com"
            buttonText="Logout"
            onLogoutSuccess={() => setIsAuthenticated(false)}
          />
        </div>
      ) : (
        <div>
          {error ? <p>something went wrong</p> : null}
          <GoogleLogin
            clientId="509100598048-ahu311l4ugtmf68q093g8po4oqubc38s.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={() => setIsAuthenticated(true)}
            onFailure={responseGoogle}
            cookiePolicy={"single_host_origin"}
          />
        </div>
      )}
    </div>
  );
};

export default Login;
