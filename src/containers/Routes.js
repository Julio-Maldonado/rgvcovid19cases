import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./Home";
import About from './About';
import Resources from './Resources';

export default () => {
  return (
    <Switch>
      <Route path="/about" exact component={About} />
      <Route path="/resources" exact component={Resources} />
      <Route path="/" component={Home} />
      <Route path="*" component={Home} />
      <Route component={Home} />
    </Switch>
  );
};
