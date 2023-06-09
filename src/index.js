import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import LoginProvider from './hooks/provider/LoginProvider';
// import Routes from './routes';
import App from './App';
import SearchBarProvider from './hooks/provider/SearchBarProvider';

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(
    <BrowserRouter>
      <SearchBarProvider>
        <LoginProvider>
          <App />
        </LoginProvider>
      </SearchBarProvider>
    </BrowserRouter>,
  );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
