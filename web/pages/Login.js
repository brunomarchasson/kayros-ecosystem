import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { PasswordField } from '../components/PasswordField';
import TextField from '@mui/material/TextField';

function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();
  const { state } = useLocation();

  const handleLogin = () => {
    console.log(email, password)
    login(email, password).then(() => {
      navigate("/home");
    });
  };

  return (
    <div>
      <h1>Login</h1>
      <TextField
        id="email"
        value={email}
        placeholder="..."
        label={('your_login')}
        autoCorrect="off"
        autoCapitalize="off"
        onChange={({ target: { value } }) => setEmail(value)}
      />
      <PasswordField
        id="password"
        type="password"
        placeholder="..."
        fullWidth
        label={('your_password')}
        value={password}
        onChange={({ target: { value } }) => setPassword(value)}
      />
      <button onClick={handleLogin}>Log in</button>
    </div>
  );
}

Login.propTypes = {}

export default Login
