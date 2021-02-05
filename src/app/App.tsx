import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Home from './pages/Home';
import CurrentAddress from './pages/CurrentAddress';

import '../assets/output.css';

const App: React.FC = () => {
  return (
    <Switch>
      <Route exact={true} path='/' component={Home} />
      <Route exact={true} path='/:address' component={CurrentAddress} />
      <Redirect to='/' />
    </Switch>
  );
};

export default App;
