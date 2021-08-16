import React, { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Loader from './components/Loader';
import Home from './pages/Home';

const SignIn = lazy(() => import('./pages/SignIn'));
const SignUp = lazy(() => import('./pages/SignUp'));
const PasswordReset = lazy(() => import('./pages/PasswordReset'));
const Checkout = lazy(() => import('./pages/Checkout'));
const Category = lazy(() => import('./pages/Category'));
const User = lazy(() => import('./pages/User'));
const Product = lazy(() => import('./pages/Product'));
const ProductDetails = lazy(() => import('./pages/ProductDetails'));

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
          <Route path='/productDetails' component={ProductDetails} />
        </Suspense>
      </Switch>
    </div>
  )
}

export default App;
