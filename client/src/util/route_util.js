import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom';

const Auth = ({ component: Component, path, loggedIn, exact }) => (
    <Route path={path} exact={exact} render={(props) => (
        !loggedIn ? (
            <Component {...props} />
        ) : (
                <Redirect to="/dashboard" />
            )
    )} />
);

const MerAuth = ({ component: Component, path, merLoggedIn, exact }) => (
    <Route path={path} exact={exact} render={(props) => (
        !merLoggedIn ? (
            <Component {...props} />
        ) : (
                <Redirect to="/merchants-dashboard" />
            )
    )} />
);

const Protected = ({ component: Component, path, loggedIn, exact }) => (
    <Route path={path} exact={exact} render={(props) => (
        loggedIn ? (
            <Component {...props} />
        ) : (
                <Redirect to="/login" />
            )
    )} />
);

const MerProtected = ({ component: Component, path, merLoggedIn, exact }) => (
    <Route path={path} exact={exact} render={(props) => (
        merLoggedIn ? (
            <Component {...props} />
        ) : (
                <Redirect to="/merchants/login" />
            )
    )} />
);

const mapStateToProps = state => (
    { loggedIn: state.session.username,
      merLoggedIn: state.session.email }
);

export const AuthRoute = withRouter(connect(mapStateToProps)(Auth));
export const MerAuthRoute = withRouter(connect(mapStateToProps)(MerAuth));
export const ProtectedRoute = withRouter(connect(mapStateToProps)(Protected));
export const MerProtectedRoute = withRouter(connect(mapStateToProps)(MerProtected));