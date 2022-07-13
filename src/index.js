import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Web3ReactProvider } from '@web3-react/core';
import { getLibrary } from './config/config'
import MetamaskProvider from './config/useEagerConnect'

ReactDOM.render(
  <Web3ReactProvider getLibrary={getLibrary}>
      <MetamaskProvider>
        <App />
      </MetamaskProvider>
    </Web3ReactProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
