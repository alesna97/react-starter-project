import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SecureRoutes from "./SecureRoutes";
import NotFound from "./NotFound";
import Login from "../container/Auth/Login";

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          {/* PUBLIC PAGE */}
          <Route exact path="/" component={Login} />
          <Route exact path="/login" component={Login} />
          <Route path='/app' render={(props) => <SecureRoutes {...props} />} />

          <Route component={NotFound} />
        </Switch>
      </Router>
    );
  }
}
export default App;
