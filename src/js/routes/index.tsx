import React from "react";
import { Switch, Route } from "react-router-dom";

import Home from "../containers/Home";
import ShipmentDetails from "../containers/ShipmentDetails";

export default (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/details/:id" component={ShipmentDetails} />
  </Switch>
);
