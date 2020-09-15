import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "../layouts/auth/login/index";
import Forget from "../layouts/auth/forget/index";
import edit_password from "../layouts/auth/reset_password";
import SecureRoutes from "./SecureRoutes";
import application from "../config/application";
import { Button } from "@material-ui/core";
import NotFound from "./NotFound";

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/login" component={Login} />
          <Route path="/lupa-kata-sandi" component={Forget} />
          <Route path="/users/password/edit" component={edit_password} />
          <Route path='/app' render={(props) => <SecureRoutes {...props} />} />

          <Route component={NotFound} />
        </Switch>
      </Router>
    );
  }
}
export default App;
