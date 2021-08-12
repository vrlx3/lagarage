import React from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import Home from "./components/Home";
import AuthForm from "./components/AuthForm";
import Landing from "./components/Landing";

function Routes(props) {
  const { user, setUser, history } = props;
  return (
    <Switch>
      <Route
        path="/login"
        render={(props) => (
          <AuthForm type="login" {...props} setUser={setUser} />
        )}
      />
      <Route
        path="/register"
        render={(props) => (
          <AuthForm type="register" {...props} setUser={setUser} />
        )}
      />
      <Route path="/home" component={Home} />

      <Route
        path="/"
        render={(props) => <Landing {...props} user={user} history={history} />}
      />
    </Switch>
  );
}

export default withRouter(Routes);
