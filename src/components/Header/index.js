import React, { useEffect } from "react";
import { withRouter } from "react-router";
import { useAuth0 } from "../../react-auth0-spa";

import { useStateValue } from "../../StateProvider";

import styles from "./index.module.scss";

const Header = props => {
  const [state, dispatch] = useStateValue();
  console.log(state);

  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();

  useEffect(() => {
    if (isAuthenticated) {
      console.log(user);
      dispatch({
        type: "LOGIN",
        data: user
      });
    }
  }, [isAuthenticated, dispatch, user]);

  return (
    <header className={styles.Header}>
      <div className={styles.Logo} onClick={() => props.history.push("/")} />
      {!isAuthenticated && (
        <button onClick={() => loginWithRedirect({})}>Log in</button>
      )}

      {isAuthenticated && <button onClick={() => logout()}>Log out</button>}
    </header>
  );
};

export default withRouter(Header);
