import React from 'react'
import PropTypes from 'prop-types'
import { Link, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Login from './pages/Login'
import Home from './pages/Home'
import useAuth from './hooks/useAuth';
import Public from './pages/Public';
import Quotation from './pages/Quotation';

function RequireAuth({ children }) {
  const { authed } = useAuth();
  const location = useLocation();
  console.log('authed', authed)
  if(authed === null) return null;
  return authed === true ? (
    children
  ) : (
    <Navigate to="/login" replace state={{ path: location.pathname }} />
  );

}

function AppRoutes(props) {
  const { authed } = useAuth();
  if(authed === null) return null;
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/quotation" element={
        <RequireAuth>
        <Quotation />
        </RequireAuth>
      } />
      <Route path="/" element={<RequireAuth>
        <Home />
      </RequireAuth>
      } />
    </Routes>
  )
}

AppRoutes.propTypes = {}

export default AppRoutes
