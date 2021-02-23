import React from "react";
import { BrowserRouter, Link, Switch } from "react-router-dom";

import Routes from "Routes";

function App() {
  return (
    <BrowserRouter>
      <Link to="/#">Dashboard</Link>
      <Link to="/content">Installment</Link>
      <Switch>
        <Routes />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
