import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Button from '@mui/material/Button';
import { useTranslation } from 'react-i18next';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
// import SwipeableViews from 'react-swipeable-views';
import Collapse from '@mui/material/Collapse';
import { PasswordField } from '../../components/PasswordField';
import useAuth from '../../hooks/useAuth';

const RoundButton = styled(Button)({
  right: '-2rem',
  top: '-10px',
  fontSize: '55px',
  lineHeight: '2rem',
  height: '4rem',
  width: '4rem',
  position: 'absolute',
  borderRadius: '50%',
});

const StyledDialogContent = styled(DialogContent)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: stretch;
  margin: 1rem;
`;
function LoginForm() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState();
  const [customerId, setCustomerId] = useState('');
  const { t } = useTranslation();
  const [password, setPassword] = useState('');
  const loginRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleClick = (event) => {
    event.preventDefault();
    setError(null);
    login(customerId, email, password).then(() => {
      navigate('/home');
    }).catch((e) => {
      console.error(e);
      setError(e);
    });
  };

  return (
    <Dialog
      open
      PaperProps={ {
        sx: {
          overflow: 'visible',
          height: '25rem',
          width: '20rem',
          right: '5rem',
          position: 'absolute',
        },
      } }
    >
      <DialogTitle>{ t('login.title') }</DialogTitle>
      <form
        onSubmit={ handleClick }
        style={ {
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
        } }
      >
        <StyledDialogContent sx={ { flex: 1 } }>
          <TextField
            autoFocus
            id="customerId"
            value={ customerId }
            placeholder="..."
            fullWidth
            label={ t('login.customer_id') }
            autoCorrect="off"
            autoCapitalize="off"
            onChange={ ({ target: { value } }) => setCustomerId(value) }
          />

          <TextField
            inputRef={ loginRef }
            autoFocus
            id="email"
            value={ email }
            placeholder="..."
            fullWidth
            label={ t('login.email') }
            autoCorrect="off"
            autoCapitalize="off"
            onChange={ ({ target: { value } }) => setEmail(value) }
          />

          <PasswordField
            inputRef={ passwordRef }
            id="password"
            type="password"
            fullWidth
            label={ t('login.password') }
            value={ password }
            onChange={ ({ target: { value } }) => setPassword(value) }
          />

        </StyledDialogContent>
        <DialogActions sx={ { position: 'relative', height: '5rem' } }>
          <RoundButton type="submit" variant="contained" onClick={ handleClick }>
            <ArrowForwardIcon />
          </RoundButton>
        </DialogActions>
        <Collapse in={ error } sx={ { marginTop: 2 } }>
          <Alert severity="error">{ t('login.login-error') }</Alert>
        </Collapse>
      </form>
    </Dialog>
  );
}

LoginForm.propTypes = {};

export default LoginForm;
