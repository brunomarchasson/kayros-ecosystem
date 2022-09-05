import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { PasswordField } from '../../components/PasswordField';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import { Paper } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const StyledDialogContent = styled('DialogContent')`
 display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
    margin: 1rem;
`
function LoginForm(props) {
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
    <Dialog open={true} >
      <DialogTitle>Login</DialogTitle>
      <StyledDialogContent>

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
        {/* <button onClick={handleLogin}>Log in</button> */}
      </StyledDialogContent>
      <DialogActions>
        <Button onClick={handleLogin}>LogIn</Button>
        {/* <Button onClick={handleClose}>Subscribe</Button> */}
      </DialogActions>
    </Dialog>
  );
}

LoginForm.propTypes = {}

export default LoginForm
