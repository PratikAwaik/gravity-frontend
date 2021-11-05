import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";

const PrivateRoute = ({ children, ...rest }) => {
  const { currentUser } = useSelector((state) => state);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        currentUser.id ? (
          children
        ) : (
          <Redirect to={{ pathname: "/login", state: { from: location } }} />
        )
      }
    />
  );
};

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
  rest: PropTypes.object,
};

export default PrivateRoute;
