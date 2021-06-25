import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./shared/Home";
import Protocol from "./shared/Protocol";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/:protocol">
          <Protocol />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;