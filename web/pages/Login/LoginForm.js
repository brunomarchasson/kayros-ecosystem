import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Alert from '@mui/material/Alert';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import { useTranslation } from 'react-i18next';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
// import SwipeableViews from 'react-swipeable-views';
import { PasswordField } from '../../components/PasswordField';
import useAuth from '../../hooks/useAuth';
import Collapse from '@mui/material/Collapse';

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
  // const [pageIndex, setPageIndex] = useState(0);
  const loginRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const { login } = useAuth();

  // const handleChangeIndex = () => setPageIndex(1);

  const handleClick = (event) => {
    event.preventDefault();
    // if (pageIndex === 0) {
    //   setPageIndex(1);
    //   passwordRef.current.focus();
    // } else {
      setError(null)
      login(customerId, email, password).then(() => {
        navigate('/home');
      }).catch(e=> {
        console.log(e)
        setError(e)
      });
    // }
  };

  // const handleBackClick = (event) => {
  //   event.preventDefault();
  //   setPageIndex(0);
  //   loginRef.current.focus();
  // };

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
        {/* <SwipeableViews
          style={ { flex: 1 } }
          index={ pageIndex }
          onChangeIndex={ handleChangeIndex }
        > */}
          <StyledDialogContent sx={ { flex: 1 } }>
            <TextField
              autoFocus
              id="customerId"
              value={ customerId }
              placeholder="..."
              fullWidth
              label="customer_id"
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
              label="your_email"
              autoCorrect="off"
              autoCapitalize="off"
              onChange={ ({ target: { value } }) => setEmail(value) }
            />

            { /* <button onClick={handleLogin}>Log in</button> */ }
          {/* </StyledDialogContent> */}

          {/* <StyledDialogContent sx={ { flex: 1 } }>
            { pageIndex === 1 && (
              <Stack direction="row" alignItems="center" gap={ 1 }>
                <IconButton
                  size="small"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  onClick={ handleBackClick }
                >
                  <ArrowBackIcon />
                </IconButton>
                <Avatar sx={ { width: 24, height: 24 } } />
                <Typography variant="h6" component="div" sx={ { flexGrow: 1 } }>
                  { email }
                </Typography>
              </Stack>
            ) } */}

            <PasswordField
              inputRef={ passwordRef }
              id="password"
              type="password"
              fullWidth
              label="your_password"
              value={ password }
              onChange={ ({ target: { value } }) => setPassword(value) }
            />

            { /* <button onClick={handleLogin}>Log in</button> */ }
          </StyledDialogContent>
        {/* </SwipeableViews> */}
        <DialogActions sx={ { position: 'relative', height: '5rem' } }>
          <RoundButton type="submit" variant="contained" onClick={ handleClick }>
            <ArrowForwardIcon />
          </RoundButton>
          { /* <Button onClick={ handleLogin }>LogIn</Button> */ }
          { /* <Button onClick={handleClose}>Subscribe</Button> */ }
        </DialogActions>
        <Collapse in={error}>
        <Alert severity="error">erreur de connexion</Alert>
        </Collapse>
      </form>
    </Dialog>
  );
}

LoginForm.propTypes = {};

export default LoginForm;
