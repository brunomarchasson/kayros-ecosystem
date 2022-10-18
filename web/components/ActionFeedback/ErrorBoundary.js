import React from 'react';

// Error boundaries currently have to be classes.

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    console.log('eer');
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.log('err', error);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}
