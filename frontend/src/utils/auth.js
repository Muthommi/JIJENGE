import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProjectedRoute = ({ component: Component, ...rest }) => {
    const { user } = React.useContext(AuthContext);

    return (
        <Route
	    {...rest}
	    render={(props) =>
	        user ? <Component {...props} /> : <Redirect to="/login" />
	    }
        />
    );
};

export default ProtectedRoute;
