import { CssBaseline } from '@mui/material';
import React from 'react';
import AppLayout from './components/AppLayout';
import { ApiProvider } from './hooks/api';
import { TranslationProvider } from './hooks/Translation';
import { AuthProvider } from './hooks/useAuth';
import AppRoutes, { AuthRoutes } from './Routes';
import { ThemeProvider } from "./theme";

function App({apiId}) {
  if(!apiId) return null
  console.log('app')
  return (
    <ApiProvider apiId={apiId} >
    <TranslationProvider>
    <ThemeProvider >
      <CssBaseline />
      <AuthProvider>
          <AuthRoutes>
          <AppLayout>
            <AppRoutes />
          </AppLayout>
          </AuthRoutes>
      </AuthProvider>
    </ThemeProvider>
    </TranslationProvider>
    </ApiProvider>
  );
}

export default App;
