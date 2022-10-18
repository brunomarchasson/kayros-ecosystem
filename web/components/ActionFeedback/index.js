import {
  Button,
  CircularProgress, Container, Dialog, DialogActions, DialogContent, DialogTitle, Modal,
} from '@mui/material';
import { Box } from '@mui/system';
import React, { Suspense, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Loader from '../Loader';
import ErrorBoundary from './ErrorBoundary';


function LoadingState({ status }) {
  return (
    <Container sx={ {
      minWidth: '10em',
      minHeight: '10em',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      display: 'flex',
      flex: 1,
      background: 'transparent',
      overflow: 'hidden',
    } }
    >
      <Loader variant="status" status={ status } />
    </Container>
  );
}

function ErrorState({ onClose }) {
  const { t } = useTranslation();

  return (
    <>
      <DialogTitle>
        { t('error.title') }
      </DialogTitle>
      <DialogContent>
        { t('error.content') }
      </DialogContent>
      <DialogActions>
        <Button onClick={ onClose }>{ t('quotation.result.quit') }</Button>
      </DialogActions>
    </>
  );
}

function Inner({
  promise, onComplete, children, onClose,
}) {
  const [success, setSuccess] = useState(false);
  const [result, setResult] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('rrr');
    if (promise) {
      setResult('');
      setSuccess(false);
      setError(null);
      setLoading(true);

      promise().then((res) => {
        setSuccess(true);
        setResult(res);
        if (onComplete)onComplete(res);
      }).catch((e) => {
        console.log('eee');
        console.error(e);
        setError(e || error);
      })
        .finally(() => setTimeout(() => setLoading(false), 2000));
    }
  }, [promise]);

  const getStatus = () => {
    if (success) return 'success';
    if (error) return 'failed';
    return 'pending';
  };
  if (loading) return <LoadingState status={ getStatus() } />;

  if (!promise) return null;

  if (error) return <ErrorState onClose={ onClose } />;
  return React.cloneElement(children, { result });
}

function ActionFeedback(props) {
  return (
    <ErrorBoundary fallback={ <ErrorState onClose={ props.onClose } /> }>
      <Dialog open={ props.promise }>
        { /* <Suspense fallback={ <LoadingState /> }> */ }
        <Inner { ...props } />
        { /* </Suspense> */ }
      </Dialog>
    </ErrorBoundary>
  );
}

ActionFeedback.propTypes = {};

export default ActionFeedback;

