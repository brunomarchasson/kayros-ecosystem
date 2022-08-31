import { CssBaseline } from '@mui/material';
import React from 'react';
import AppLayout from './components/AppLayout';
import { AuthProvider } from './hooks/useAuth';
import AppRoutes from './Routes';
import { ThemeProvider } from "./theme";

function App() {
  return (
    <ThemeProvider >
      <CssBaseline />
      <AuthProvider>
          <AppLayout>
            <AppRoutes />
          </AppLayout>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
