import React from 'react';
import {Provider} from 'react-redux';
import {store} from './store';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import MainPage from "./components/MainPage";
import FamilyForm from "./components/FamilyForm";
import PlacementForm from "./components/PlacementForm";
;

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/" exact>
            <MainPage/>
          </Route>
          <Route path="/new-family">
            <FamilyForm/>
          </Route>
          <Route path="/new-placement">
            <PlacementForm/>
          </Route>
          <Redirect
            to={{
              pathname: '/'
            }}
          />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
