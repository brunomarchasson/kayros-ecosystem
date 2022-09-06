import React from 'react';
import {
  Routes, Route, Navigate, useLocation,
} from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import useAuth from './hooks/useAuth';
import Quotation from './pages/Quotation';
import { childrenProps } from './proptypes';

function RequireAuth({ children }) {
  const { authed } = useAuth();
  const location = useLocation();
  if (authed === null) return null;
  return authed === true ? (
    children
  ) : (
    <Navigate to="/login" replace state={ { path: location.pathname } } />
  );
}
RequireAuth.propTypes = {
  children: childrenProps,
};

export function AuthRoutes({ children }) {
  return (
    <Routes>
      <Route path="/login" element={ <Login /> } />
      <Route path="/*" element={ <RequireAuth>{ children }</RequireAuth> } />
    </Routes>
  );
}
AuthRoutes.propTypes = {
  children: childrenProps,
};
function AppRoutes() {
  const { authed } = useAuth();
  if (authed === null) return null;
  return (
    <Routes>
      { /* <Route path="/login" element={<Login />} /> */ }
      <Route path="/home" element={ <Home /> } />
      <Route
        path="/quotation"
        element={ (
          <RequireAuth>
            <Quotation />
          </RequireAuth>
        ) }
      />
      <Route
        path="/"
        element={ (
          <RequireAuth>
            <Home />
          </RequireAuth>
        ) }
      />
    </Routes>
  );
}

AppRoutes.propTypes = {};

export default AppRoutes;
