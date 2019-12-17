import React from "react";
import { ModalProvider } from "react-modal-hook";
import { TransitionGroup } from "react-transition-group";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Login from "../components/Login";
import Home from "../pages/Home";
import Header from "../components/Header";
import TenantRequest from "../pages/TenantRequest";
import RequestDetails from "../pages/RequestDetails";
import { StateProvider } from "../StateProvider";

import styles from "./index.module.scss";

function App() {
  const profileData = JSON.parse(localStorage.getItem("profile"));

  const initialState = {
    loggedIn: !!profileData,
    userData: profileData,
    properties: [],
    role: undefined,
    uploads: []
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "LOGIN":
        return {
          ...state,
          loggedIn: true,
          userData: action.data
        };

      case "LOGOUT":
        return {
          ...state,
          loggedIn: false,
          userData: undefined
        };

      case "SET_PROPERTIES": {
        return {
          ...state,
          properties: action.data
        };
      }

      case "SET_USER_ROLE":
        return {
          ...state,
          role: action.data
        };

      case "UPLOAD_SUCCESS":
        return {
          ...state,
          uploads: [...state.uploads, action.data]
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
            <ModalProvider container={TransitionGroup}>
              <Route exact path="/" component={Home} />
              <Route path="/login" component={Login} />
              <Route path="/request/:id" component={RequestDetails} />
              <Route exact path="/request" component={TenantRequest} />
            </ModalProvider>
          </div>
        </Router>
      </div>
    </StateProvider>
  );
}

export default App;
