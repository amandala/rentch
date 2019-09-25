import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Login from "../Login";
import Home from "../Home";
import Header from "../Header";
import TenantRequest from "../TenantRequest";
import { StateProvider } from "../StateProvider";

import styles from "./index.module.scss";

function App() {
  const profileData = JSON.parse(localStorage.getItem("profile"));

  const initialState = {
    loggedIn: !!profileData,
    userData: profileData
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "login":
        return {
          ...state,
          loggedIn: true,
          userData: action.data
        };

      case "logout":
        return {
          ...state,
          loggedIn: false,
          userData: undefined
        };

      default:
        return state;
    }
  };

  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <div>
        <Router>
          <Header />
          <div className={styles.App}>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/request" component={TenantRequest} />
          </div>
        </Router>
      </div>
    </StateProvider>
  );
}

export default App;
