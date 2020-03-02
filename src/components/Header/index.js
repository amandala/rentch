import React from "react";
import { withRouter } from "react-router";
import { useAuth0 } from "../../react-auth0-spa";
import { ButtonText } from "../Button";

import styles from "./index.module.scss";

const Header = props => {
  const { isAuthenticated, logout } = useAuth0();

  return (
    <header className={styles.Header}>
      <div className={styles.Content}>
        <div className={styles.Logo} onClick={() => props.history.push("/")} />
        {isAuthenticated && (
          <div className={styles.Logout}>
            <ButtonText onClick={() => logout()}>Log out</ButtonText>
          </div>
        )}
      </div>
    </header>
  );
};

export default withRouter(Header);
