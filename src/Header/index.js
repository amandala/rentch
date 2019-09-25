import React from "react";
import { withRouter } from "react-router";
import { GoogleLogout, GoogleLogin } from "react-google-login";

import { useStateValue } from "../StateProvider";

import "./index.css";

const Header = props => {
  const [{ loggedIn }, dispatch] = useStateValue();
  return (
    <header className="Header">
      <div onClick={() => props.history.push("/")} className="Logo" />
      {loggedIn ? (
        <GoogleLogout
          clientId="509100598048-ahu311l4ugtmf68q093g8po4oqubc38s.apps.googleusercontent.com"
          buttonText="Logout"
          onLogoutSuccess={() => {
            dispatch({
              type: "logout"
            });
            localStorage.removeItem("profile");
          }}
          onLogoutFailure={() => {
            console.log("FAILURE");
          }}
        />
      ) : null}
    </header>
  );
};

export default withRouter(Header);
