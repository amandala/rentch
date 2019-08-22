import React from "react";
import { GoogleLogout, GoogleLogin } from "react-google-login";

import { useStateValue } from "../StateProvider";

import "./index.css";

const Header = () => {
  const [{ loggedIn }, dispatch] = useStateValue();
  return (
    <header className="Header">
      <div className="Logo" />
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
        />
      ) : null}
    </header>
  );
};

export default Header;
