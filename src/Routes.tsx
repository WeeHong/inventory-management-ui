import React from "react";
import { Route } from "react-router-dom";

import ProtectedRoute from "components/Auth/ProtectedRoute";

import Login from "components/Auth/Login";
import Dashboard from "components/Dashboard";
import Product from "components/Products";

function Routes() {
  return (
    <>
      <Route path="/login" component={Login} />
      <ProtectedRoute path="/" component={Dashboard} exact />
      <ProtectedRoute path="/products" component={Product} />
    </>
  );
}

export default Routes;
