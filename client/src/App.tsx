import React, { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Loader from './components/Loader';
import Home from './pages/Home';
import Login from './pages/Login';
import Checkout from './pages/Checkout';

function App(): JSX.Element {

  return (
    <React.Fragment>
      <Header />
      <Switch>
        <Suspense fallback={<Loader />}>
          <Route exact path='/' component={Home} />
          <Route path='/login' component={Login} />
          <Route path='/checkout' component={Checkout} />
        </Suspense>
      </Switch>
    </React.Fragment>
  )
}

export default App;
