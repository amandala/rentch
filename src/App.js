import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Login from "./Login";
import Home from "./Home";
import Header from "./Header";
import { StateProvider } from "./StateProvider";

import "./App.css";

function App() {
  const initialState = {
    loggedIn: false,
    userData: undefined
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
      <div className="App">
        <Router>
          <Header />
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
        </Router>
      </div>
    </StateProvider>
  );
}

export default App;
