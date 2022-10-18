import React from 'react';
import PropTypes from 'prop-types';

import DefaultLoader from './DefaultLoader';
import LoaderWithCheck from './WithCheck';

function Loader({ variant, ...props }) {
  if (variant === 'status') return <LoaderWithCheck { ...props } />;
  return <DefaultLoader />;
}

Loader.propTypes = {
  variant: PropTypes.string
};

export default Loader;

