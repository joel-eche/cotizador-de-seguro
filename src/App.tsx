import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./components/Home/Home";
import Choosing from "./components/Choosing/Choosing";
import Thanks from "./components/Thanks/Thanks";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/choosing">
          <Choosing />
        </Route>
        <Route path="/thanks">
          <Thanks />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
