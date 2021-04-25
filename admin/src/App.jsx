import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import Home from 'pages/Home';
import Login from 'pages/Login';
import AuthRoute from 'components/AuthRoute';

function App() {

  return (
    <Router>
      <Switch>
        <Route path='/login' component={Login}  />
        <AuthRoute path='/'>
          <Home />
        </AuthRoute>
      </Switch>
    </Router>
  );
}

export default App;
