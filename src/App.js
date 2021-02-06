import React, { useEffect, useState } from "react";
import "./css/App.css";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { Body } from "./routes";
import { Navbar, Welcome } from "./components";
import { GlobalStyle } from "./global";
import { auth } from "./firebase";

function App() {
  const [isInitialized, setInitialized] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) {
        setIsSignedIn(true);
      } else setIsSignedIn(false);
      setInitialized(true);
    });
  }, [isSignedIn]);

  return isInitialized ? (
    <div className="App" style={{ display: "flex", flexDirection: "column" }}>
      {isSignedIn && <Navbar />}
      <Router>
        {isSignedIn && <Body />}
        <Route exact path="/welcome" component={Welcome} />
        {!isSignedIn && <Redirect from="*" to="/welcome" />}
      </Router>
      <GlobalStyle />
    </div>
  ) : null;
}

export default App;
