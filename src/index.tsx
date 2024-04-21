import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from "react-router-dom";

import './index.css';
import store from './common/store';
import reportWebVitals from './reportWebVitals';

import AppRoutes from './common/routes';
import Notification from "./common/notifications/Notifications";

ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
          <BrowserRouter>
              <Notification />
              <AppRoutes />
          </BrowserRouter>
      </Provider>
  </React.StrictMode>,
  document.getElementById('root') as HTMLElement
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
