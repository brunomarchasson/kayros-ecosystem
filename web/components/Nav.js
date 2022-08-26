import React from 'react'
import PropTypes from 'prop-types'
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

function Nav(props) {
  const { authed, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/pricing">Pricing</Link>
        </li>
        <li>
          <Link to="/public">Public</Link>
        </li>
      </ul>
      {authed && <button onClick={handleLogout}>Logout</button>}
    </nav>
  );
}

Nav.propTypes = {}

export default Nav
