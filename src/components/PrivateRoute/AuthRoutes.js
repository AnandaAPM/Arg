import React from 'react';
import {Route, Redirect} from 'react-router-dom';

const AuthRoutes = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        !(localStorage.getItem("id_token") && localStorage.getItem("refresh_token"))
            ? <Component {...props} />
            : <Redirect to='/admin/index' />
    )} />
);

export default AuthRoutes;
