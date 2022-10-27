import { CssBaseline } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';
import AppLayout from './components/AppLayout';
import { ApiProvider } from './hooks/api';
import { AuthProvider } from './hooks/useAuth';
import AppRoutes, { AuthRoutes } from './Routes';
import { ThemeProvider } from './theme';

function App({ apiId }) {
  if (!apiId) return null;
  return (
    <ApiProvider apiId={ apiId }>
      <ThemeProvider>
        <CssBaseline />
        <AuthProvider>
          <AuthRoutes>
            <AppLayout>
              <AppRoutes />
            </AppLayout>
          </AuthRoutes>
        </AuthProvider>
      </ThemeProvider>
    </ApiProvider>
  );
}
App.propTypes = {
  apiId: PropTypes.string,
};
export default App;
