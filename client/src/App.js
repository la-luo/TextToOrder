import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import { AuthRoute, ProtectedRoute, MerAuthRoute, MerProtectedRoute } from './util/route_util';
import jwt_decode from 'jwt-decode';
import setAuthToken from './util/set_auth_token';
import { receiveCurrentUser, receiveCurrentMerchant, logoutUser, logoutMerchant } from './actions/session_actions';
import store from './store/store';
// Components
import Splash from './components/homepage';
import PublicMenu from './components/public_menu';
//customer components
import Signup from './components/cus_session_form/signup_container';
import Login from './components/cus_session_form/login_container';
import cusDashboard from './components/cus_dashboard/dashboard';
//merchant components
import merSignup from './components/mer_session_form/signup_container';
import merLogin from './components/mer_session_form/login_container';
import merDashboard from './components/mer_dashboard/dashboard';
import Checkout from './components/checkout';

window.getState = store.getState;
window.dispatch = store.dispatch;

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  if (window.location.pathname === "/merchants/dashboard") {
    store.dispatch(receiveCurrentMerchant(decoded));
  } else {
    store.dispatch(receiveCurrentUser(decoded));
  }

  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {

    if (window.location.pathname === "/merchants/dashboard") {
      store.dispatch(logoutMerchant());
      window.location.href = '/merchants/login';
    } else {
      store.dispatch(logoutUser());
      window.location.href = '/login';
    }
  }
}

const CheckoutSuccess = () => (
  <div className="checkout container-fluid">
    <div className="row d-flex">
      <div className="card"></div>
        <div className="row-title">
          <span class="material-icons success-icon">
            done_outline
          </span>
        </div>
        <div className="row">
          <h3 className="row-title success-message">Thank you for your purchase</h3>
        </div>
    </div>
  </div>
)

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
            <MerAuthRoute exact path="/merchants/login" component={merLogin} />
            <MerAuthRoute exact path="/merchants/signup" component={merSignup} />
            <MerProtectedRoute exact path="/merchants/dashboard" component={merDashboard} />
            <Route exact path="/merchants/:merchantId" component={PublicMenu}  />
            <Route exact path="/checkout/:orderId" component={Checkout} />
            <Route exact path="/success" component={CheckoutSuccess}/>
            <Redirect to="/merchants/login" />
            </Switch>
          </div>
        </BrowserRouter>
      </Provider>;
  }
}

export default App;