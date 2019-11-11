import React, { useState, useEffect } from 'react';
import { navigate } from 'gatsby';
import { isLoggedIn } from '../services/auth';

export function withPrivateRoute(Component) {
  return function MyComponent(props) {
    const [isAuthenticated, setAuthenticated] = useState(false);
    const isLoggedInValue = isLoggedIn();

    useEffect(() => {
      setAuthenticated(isLoggedInValue);
      if (!isLoggedInValue) {
        navigate('/login');
      }
    }, [isLoggedInValue]);

    return isAuthenticated ? <Component {...props} /> : null;
  };
}
