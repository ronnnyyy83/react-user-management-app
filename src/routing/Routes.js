import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "../components/Home";
import Login from "../components/Login";
import Users from "../components/Users";
import AppliedRoute from "./AppliedRoute";
import NotFound from "../components/NotFound";
import AuthenticatedRoute from "./AuthenticatedRoute";
import UnauthenticatedRoute from "./UnauthenticatedRoute";

export default ({ childProps, makeLogin }) =>
  <Switch>
    <AppliedRoute path="/" exact component={Home} props={childProps} />
    <UnauthenticatedRoute path="/login" exact component={Login} props={{...childProps, makeLogin}}/>
    <AuthenticatedRoute path="/users" exact component={Users} props={childProps} />
    { /*catch all unmatched routes */ }
    <Route component={NotFound} />
  </Switch>;
