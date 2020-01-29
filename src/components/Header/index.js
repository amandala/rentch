import React from "react";
import { withRouter } from "react-router";
import { useAuth0 } from "../../react-auth0-spa";

// import { useStateValue } from "../../StateProvider";
// import { ButtonText } from "../Button";

import styles from "./index.module.scss";

const Header = props => {
  const { isAuthenticated, loginWithRedirect, logout, loading } = useAuth0();

  // const [{ loggedIn }, dispatch] = useStateValue();
  return (
    <header className={styles.Header}>
      <div className={styles.Logo} onClick={() => props.history.push("/")} />
      {loading ? "LOADING..." : null}
      {!isAuthenticated && (
        <button onClick={() => loginWithRedirect({})}>Log in</button>
      )}

      {isAuthenticated && <button onClick={() => logout()}>Log out</button>}
    </header>
  );
};

export default withRouter(Header);
