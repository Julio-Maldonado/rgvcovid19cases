import React from "react";

import { Route, Switch } from "react-router-dom";

import Home from "./Home";
import About from './About';
import Resources from './Resources';
import TrueHome from "./TrueHome";

export default () => {
  return (
    <Switch>
      <Route
        exact
        path="/about"
        component={About} 
      />
      <Route
        exact
        path="/resources"
        component={Resources} 
      />
      <Route
        path="/cameron"
        render={props => <Home {...props} county={"Cameron"} />}
      />
      <Route
        path="/hidalgo"
        render={props => <Home {...props} county={"Hidalgo"} />}
      />
      <Route
        path="/home"
        component={TrueHome}
      />
      <Route
        path="*"
        component={TrueHome}
      />
      <Route
        component={TrueHome}
      />
    </Switch>
  );
};
