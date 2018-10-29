import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import PrivateRoute from "../../library/privateRoute";
import Four04 from "../404";
import Login from "../login";
import SignUp, { SIGNUP_PATH } from "../signup";
import ForgotPassword, { FORGOT_PASSWORD_PATH } from "../reset-password";
import Home from "../home";

const App = ({ $auth }) => (
  <Switch>
    <Route exact path="/" render={() => <Redirect to="/login" />} />
    <Route
      path="/login"
      render={() => ($auth ? <Redirect to="/home" /> : <Login />)}
    />
    <PrivateRoute path="/home" component={Home} $auth={$auth} />
    <Route path={SIGNUP_PATH} component={SignUp} />
    <Route path={FORGOT_PASSWORD_PATH} component={ForgotPassword} />
    <Route exact path="/404" component={Four04} />
    <Route exact path="*" render={() => <Redirect to="/404" />} />
  </Switch>
);

const mapStateToProps = ({ auth: { $auth } }) => ({
  $auth
});

const AppCmpt = withRouter(connect(mapStateToProps)(App));

export default AppCmpt;
