import React from 'react';
import {Route, Redirect} from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        localStorage.getItem("id_token") && localStorage.getItem("refresh_token")
            ? <Component {...props} />
            : <Redirect to='/auth/login' />
    )} />
);

export default PrivateRoute;
