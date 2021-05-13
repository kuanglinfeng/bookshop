import React, { useState, useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
import api from '@/api';
import Loading from './Loading';

const AuthRoute: React.FC = (props) => {
  const { children, ...rest } = props;
  const [authStatus, setAuthStatus] = useState('init');

  useEffect(() => {
    (async () => {
      const token = window.localStorage.getItem('token') || '';
      const { data } = await api.auth(token);
      if (data) {
        setAuthStatus('success');
      } else {
        setAuthStatus('fail');
      }
    })();
  }, []);

  if (authStatus === 'init') return <Loading />;

  if (authStatus === 'success') return <Route {...rest}>{children}</Route>;

  return (
    <Route
      {...rest}
      render={({ location }) => (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: location },
          }}
        />
      )}
    />
  );
};

export default AuthRoute;
