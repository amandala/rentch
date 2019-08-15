import React from "react";
import Login from "./Login";
import { StateProvider } from "./StateProvider";

import "./App.css";

function App() {
  const initialState = {
    loggedIn: false
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "login":
        return {
          ...state,
          loggedIn: true
        };

      case "logout":
        return {
          ...state,
          loggedIn: false
        };

      default:
        return state;
    }
  };

  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <div className="App">
        <header className="App-header">
          <div className="App-logo" />
          <ul className="App-nav" />
        </header>
        <Login />
      </div>
    </StateProvider>
  );
}

export default App;
