import React, { useEffect, useState } from "react";
import "./css/App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Home } from "./routes";
import { Navbar, Hero } from "./components";
import { GlobalStyle } from "./global";
import { auth } from "./firebase";

function App() {
  const [isInitialized, setInitialized] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) {
        setIsLoggedIn(true);
      } else setIsLoggedIn(false);
      setInitialized(true);
    });
  }, [isLoggedIn]);

  return isInitialized ? (
    <div className="App">
      <Navbar />
      <Router>
        <Switch>
          <Route exact path="/" component={isLoggedIn ? Home : Hero} />
        </Switch>
      </Router>
      <GlobalStyle />
    </div>
  ) : null;
}

export default App;
