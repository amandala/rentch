import React, { useState } from "react";

import "./App.css";

function App() {
  const [showMessage, setShowMessage] = useState(false);

  return (
    <div className="App">
      <header className="App-header">
        <div className="App-logo" />
        <ul className="App-nav">
          <li onClick={() => setShowMessage(!showMessage)}>
            <a className="App-nav-item">Login</a>
          </li>
        </ul>
      </header>
      <p className={showMessage ? `App-message--show` : "App-message"}>
        Login coming soon!
      </p>
    </div>
  );
}

export default App;
