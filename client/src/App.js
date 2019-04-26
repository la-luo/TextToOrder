import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import { AuthRoute, ProtectedRoute } from './util/route_util';

import jwt_decode from 'jwt-decode';
import setAuthToken from './util/set_auth_token';
import { receiveCurrentUser, logoutUser } from './actions/session_actions';
import store from './store/store';
// Components
import Splash from './components/splash';
import Signup from './components/session_form/signup_container';
import Login from './components/session_form/login_container';
import Dashboard from './components/dashboard/dashboard';


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
            <ProtectedRoute exact path="/dashboard" component={Dashboard} />
            <Redirect to="/404" />
            </Switch>
          </div>
        </BrowserRouter>
      </Provider>;
  }
}

export default App;