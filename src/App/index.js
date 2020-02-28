import React from "react";
import { ModalProvider } from "react-modal-hook";
import { TransitionGroup } from "react-transition-group";
import { BrowserRouter as Router, Route } from "react-router-dom";
import HttpsRedirect from "react-https-redirect";

import Login from "../components/Login";
import Home from "../pages/Home";
import Header from "../components/Header";
import TenantRequest from "../pages/TenantRequest";
import RequestDetails from "../pages/RequestDetails";
import { StateProvider } from "../StateProvider";
import ProtectedRoute from "../components/ProtectedRoute";

import styles from "./index.module.scss";

const HttpApp = () => (
  <HttpsRedirect>
    <App />
  </HttpsRedirect>
);

function App() {
  const initialState = {
    properties: [],
    role: undefined,
    uploads: []
  };

  const reducer = (state, action) => {
    switch (action.type) {
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
      <div className={styles.AppWrapper}>
        <Router>
          <Header />
          <div className={styles.App}>
            <ModalProvider container={TransitionGroup}>
              <ProtectedRoute exact path="/" component={Home} />
              <Route path="/login" component={Login} />
              <ProtectedRoute path="/request/:id" component={RequestDetails} />
              <ProtectedRoute exact path="/request" component={TenantRequest} />
            </ModalProvider>
          </div>
        </Router>
      </div>
    </StateProvider>
  );
}

export default HttpApp;
