import React, { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Loader from './components/Loader';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import PasswordReset from './pages/PasswordReset';
import Checkout from './pages/Checkout';
import Category from './pages/Category';
import User from './pages/User';
import Product from './pages/Product';

function App(): JSX.Element {

  return (
    <div>

      <Header />
      <Switch>
        <Suspense fallback={<Loader />}>
          <Route exact path='/' component={Home} />
          <Route exact path='/category' component={Category} />
          <Route path='/signIn' component={SignIn} />
          <Route path='/signUp' component={SignUp} />
          <Route path='/passwordReset' component={PasswordReset} />
          <Route path='/checkout' component={Checkout} />
          <Route path='/user' component={User} />
          <Route path='/product' component={Product} />
        </Suspense>
      </Switch>
    </div>
  )
}

export default App;
