import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Navbar from './component/Navbar'
import WalletManager from './page/WalletManager'
import Collections from './page/Collections'
import Mint from './page/Mint'
import { Web3ReactProvider } from '@web3-react/core';
import { getLibrary } from './wallet/wallet'
import MetamaskProvider from './wallet/useEagerConnect'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import store from './store/store'
import { Provider } from 'react-redux'

ReactDOM.render(
  <React.StrictMode>
    <Web3ReactProvider getLibrary={getLibrary}>
      <Provider store={store}>
        <MetamaskProvider>
          <BrowserRouter>
            <Navbar/>
            <Routes>
              <Route path="/" element={<Mint />} />
              <Route path="/wallet-manager" element={<WalletManager/>} />
              <Route path="/collections" element={<Collections/>} />
            </Routes>
          </BrowserRouter>
        </MetamaskProvider>
      </Provider>
    </Web3ReactProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
