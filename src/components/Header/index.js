import React from "react";
import { withRouter } from "react-router";

import { useStateValue } from "../../StateProvider";
import { ButtonText } from "../Button";

import styles from "./index.module.scss";

const Header = props => {
  const [{ loggedIn }, dispatch] = useStateValue();
  return (
    <header className={styles.Header}>
      <div className={styles.Logo} onClick={() => props.history.push("/")} />
      {loggedIn ? (
        <ButtonText
          onClick={() => {
            props.history.push("/login");
            dispatch({
              type: "LOGOUT"
            });
            localStorage.removeItem("profile");
          }}
        >
          Logout
        </ButtonText>
      ) : null}
    </header>
  );
};

export default withRouter(Header);
