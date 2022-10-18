import React from 'react';
import PropTypes from 'prop-types';

import { cx } from '@emotion/css';
import styles from './index.module.css';

function LoaderWithCheck({ status }) {
  const statusClass = {
    success: 'success',
    failed: 'failed',
  };
  return (
    <div className={ cx(styles['circle-loader'], styles[statusClass[status]]) }>
      <div className={ cx(styles.status, styles.draw) } />
    </div>
  );
}

LoaderWithCheck.propTypes = {};

export default LoaderWithCheck;

