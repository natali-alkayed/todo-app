import React, { useState, useEffect } from 'react';
import cookie from 'react-cookies';
import jwt_decode from 'jwt-decode';

const testUsers = {
  Administrator: {
    password: 'admin',
    name: 'Administrator',
    token: 'your-token-here',
  },
  Editor: {
    password: 'editor',
    name: 'Editor',
    token: 'your-token-here',
  },
  Writer: {
    password: 'writer',
    name: 'Writer',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiV3JpdGVyIiwicm9sZSI6IndyaXRlciIsImNhcGFiaWxpdGllcyI6IlsnY3JlYXRlJ10iLCJpYXQiOjE1MTYyMzkwMjJ9.dmKh8m18mgQCCJp2xoh73HSOWprdwID32hZsXogLZ68'
  },
  User: {
    password: 'user',
    name: 'User',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVXNlciIsInJvbGUiOiJ1c2VyIiwiY2FwYWJpbGl0aWVzIjoiWydyZWFkJ10iLCJpYXQiOjE1MTYyMzkwMjJ9.WXYvIKLdPz_Mm0XDYSOJo298ftuBqqjTzbRvCpxa9Go'
  },
};

export const LoginContext = React.createContext();

function LoginProvider(props) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({ capabilities: [] });
  const [error, setError] = useState(null);

  const can = (capability) => {
    return user.capabilities.includes(capability);
  };

  const login = (username, password) => {
    const auth = testUsers[username];

    if (auth && auth.password === password) {
      try {
        validateToken(auth.token);
      } catch (e) {
        setLoginState(loggedIn, user, e);
        console.error(e);
      }
    }
  };

  const logout = () => {
    setLoginState(false, {});
  };

  const validateToken = (token) => {
    try {
      const validUser = jwt_decode(token);
      setLoginState(true, validUser);
    } catch (e) {
      setLoginState(false, {}, e);
      console.log('Token Validation Error', e);
    }
  };

  const setLoginState = (loggedIn, user, error) => {
    cookie.save('auth', user.token);
    setLoggedIn(loggedIn);
    setUser(user);
    setError(error || null);
  };

  useEffect(() => {
    const qs = new URLSearchParams(window.location.search);
    const cookieToken = cookie.load('auth');
    const token = qs.get('token') || cookieToken || null;
    validateToken(token);
  }, []);

  return (
    <LoginContext.Provider value={{ loggedIn, user, can, login, logout, error }}>
      {props.children}
    </LoginContext.Provider>
  );
}

export default LoginProvider;
