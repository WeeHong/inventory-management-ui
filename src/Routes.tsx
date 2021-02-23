import React from "react";
import { Route, RouteProps } from "react-router-dom";

import Dashboard from "pages/Dashboard";
import Content from "pages/Content";

interface UniqueProps extends RouteProps {
  id: string;
}

const routes: UniqueProps[] = [
  {
    path: "/",
    component: Dashboard,
    exact: true,
    id: "dashboard",
  },
  {
    path: "/content",
    component: Content,
    exact: true,
    id: "content",
  },
];

function Routes() {
  return (
    <>
      {routes.map((route) => (
        <Route path={route.path} component={route.component} exact={route.exact} key={route.id} />
      ))}
    </>
  );
}

export default Routes;
