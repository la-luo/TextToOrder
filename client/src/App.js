import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import { AuthRoute, ProtectedRoute } from './util/route_util';

import jwt_decode from 'jwt-decode';
import setAuthToken from './util/set_auth_token';
import { receiveCurrentUser, logoutUser } from './actions/session_actions';
import store from './store/store';
// Components
import Splash from './components/homepage';
//customer components
import Signup from './components/cus_session_form/signup_container';
import Login from './components/cus_session_form/login_container';
import cusDashboard from './components/cus_dashboard/dashboard';
//merchant components
import merSignup from './components/mer_session_form/signup_container';
import merLogin from './components/mer_session_form/login_container';
import merDashboard from './components/mer_dashboard/dashboard';
import Menu from './components/mer_dashboard/menu';

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(receiveCurrentUser(decoded));

  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = '/login';
  }
}

class App extends Component {
  render() {
    return <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            <Switch>
            <Route exact path="/" component={Splash}  />
            <AuthRoute exact path="/login" component={Login} />
            <AuthRoute exact path="/signup" component={Signup} />
            <ProtectedRoute exact path="/dashboard" component={cusDashboard} />
            <AuthRoute exact path="/merchant/login" component={merLogin} />
            <AuthRoute exact path="/merchant/signup" component={merSignup} />
            <AuthRoute exact path="/merchant/dashboard" component={merDashboard} />
            <Route exact path="/merchant/menu" component={Menu} />
            <Redirect to="/404" />
            </Switch>
          </div>
        </BrowserRouter>
      </Provider>;
  }
}

export default App;