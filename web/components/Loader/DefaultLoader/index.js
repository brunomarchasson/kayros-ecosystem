import React from 'react';
import PropTypes from 'prop-types';

import { cx } from '@emotion/css';
import styles from './index.module.css';

function DefaultLoader(props) {
  return (
    <div>

      <div className={ styles.loader }>
        <div className={ cx(styles.inner, styles.one) } />
        <div className={ cx(styles.inner, styles.two) } />
        <div className={ cx(styles.inner, styles.three) } />
      </div>

      <div className={ styles['circle-loader'] }>
        <div className="status draw" />
      </div>
    </div>
  );
}

DefaultLoader.propTypes = {};

export default DefaultLoader;

