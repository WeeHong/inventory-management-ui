import React from "react";
import { Route, Redirect } from "react-router-dom";

import WithLayout from "layouts/WithLayout";
import { SESSION_KEYS } from "../../constants";

function ProtectedRoute({ component: Component, ...rest }: any) {
  const isAuth = sessionStorage.getItem(SESSION_KEYS.ACCESS_TOKEN);
  return (
    <Route
      {...rest}
      render={(props) => {
        let component;
        if (isAuth) {
          component = (
            <WithLayout>
              <Component {...rest} {...props} />
            </WithLayout>
          );
        } else {
          component = <Redirect to="/login" />;
        }
        return component;
      }}
    />
  );
}

export default ProtectedRoute;
