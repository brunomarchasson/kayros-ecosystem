import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';
import {
  BrowserRouter,
} from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import i18n from './i18n';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

function Api() {
  const [apiId, setApiId] = useState('');

  useEffect(() => {
    const parsedData = window.location.pathname.split('/');
    const api = parsedData[1];
    setApiId(api);
  }, [window.location.pathname]);
  return (
    <BrowserRouter basename={ `/${apiId}` }>
      <I18nextProvider i18n={ i18n }>
        <App apiId={ apiId } />
      </I18nextProvider>
    </BrowserRouter>
  );
}
root.render(
  // <React.StrictMode>
    <Api />
  // </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
