import React, { useState, useContext } from 'react';
import { LoginContext } from '../../Context/ Auth/index';
import { When } from 'react-if';
import './Login.scss'; 

function Login() {
  const { loggedIn, login, logout } = useContext(LoginContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleChange = (e) => {
    if (e.target.name === 'username') {
      setUsername(e.target.value);
    } else if (e.target.name === 'password') {
      setPassword(e.target.value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(username, password);
  };

  return (
    <div className={`login-container ${loggedIn ? 'logged-in' : ''}`}>
      <When condition={!loggedIn}>
        <form onSubmit={handleSubmit}>
          <input
            className="login-input"
            placeholder="Username"
            name="username"
            value={username}
            onChange={handleChange}
          />
          <input
            className="login-input"
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={handleChange}
          />
          <button className="login-button">Login</button>
        </form>
      </When>

      <When condition={loggedIn}>
        <button className="logout-button" onClick={logout}>
          Log Out
        </button>
      </When>
    </div>
  );
}

export default Login;
