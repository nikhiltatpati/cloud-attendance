import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/home";
import Auth from "./components/auth";
import Dashboard from "./components/dashboard";
import AddEmployee from "./components/addEmployee";
import Attendance from "./components/attendance";
import Details from "./components/details";

function App() {
  return (
    <Router>
      <div>
        <Switch>
          {localStorage.getItem("role") === "admin" && (
            <Route
              exact
              path="/dashboard"
              render={(props) => <Dashboard {...props} />}
            />
          )}
          {!localStorage.getItem("role") && (
            <Route
              exact
              path="/auth/:role"
              render={(props) => <Auth {...props} />}
            />
          )}
          {localStorage.getItem("role") === "admin" && (
            <Route
              exact
              path="/add"
              render={(props) => <AddEmployee {...props} />}
            />
          )}
          {localStorage.getItem("role") === "employee" && (
            <Route
              exact
              path="/attendance/:id"
              render={(props) => <Attendance {...props} />}
            />
          )}
          {localStorage.getItem("role") && (
            <Route
              exact
              path="/details/:id"
              render={(props) => <Details {...props} />}
            />
          )}
          {localStorage.getItem("role") === "admin" && (
            <Route
              exact
              path="/"
              render={(props) => <Dashboard {...props} />}
            />
          )}

          {localStorage.getItem("role") === "employee" && (
            <Route
              exact
              path="/"
              render={(props) => <Attendance {...props} />}
            />
          )}

          {!localStorage.getItem("role") && (
            <Route exact path="/" render={(props) => <Home {...props} />} />
          )}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
