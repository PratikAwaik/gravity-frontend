import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ children, ...rest }) => {
  const { currentUser } = useSelector(state => state);
  return (
    <Route
      {...rest}
      render={({ location }) => (
        currentUser.id ? children : <Redirect to={{ pathname: "/login", state: { from: location } }} />
      )}
    />
  );
}

export default PrivateRoute;