import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './containers/Home/Home';
import Watch from './containers/Watch/Watch';
import AppLayout from './components/AppLayout/AppLayout';

const App = () => {
  return (
      <AppLayout>
        <Switch>
          <Route path="/watch" component={Watch} />
          <Route path="/" component={Home} />
        </Switch>
      </AppLayout>
  );
};

export default App;
