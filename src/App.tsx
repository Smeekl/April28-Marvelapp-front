import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Content from "./components/Content";
import FamilyForm from "./components/FamilyForm";
import PlacementForm from "./components/PlacementForm";
import Family from "./components/Family";
import Placement from "./components/Placement";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Content />
        </Route>
        <Route path="/new-family">
          <FamilyForm />
        </Route>
        <Route path="/new-placement">
          <PlacementForm />
        </Route>
        <Route path="/family">
          <Family />
        </Route>
        <Route path="/placement/:id">
          <Placement />
        </Route>
        <Redirect
          to={{
            pathname: "/",
          }}
        />
      </Switch>
    </Router>
  );
}

export default App;
