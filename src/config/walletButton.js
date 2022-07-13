import { useEffect, useState, useCallback } from 'react';
import { useWeb3React } from '@web3-react/core';
import { MetaMaskconnector } from './config';

const WalletButton = (props) => {

  const { active, activate, account, error } = useWeb3React()
  useEffect(() => {
    if (active) {
      localStorage.setItem('shouldEagerConnect', true)
    }
  }, [active])
  
  const handleConnectMetaMask = useCallback(() => {
    activate(MetaMaskconnector)
  },[activate])

  return (
    <button className=""> 
      <div className="" onClick={handleConnectMetaMask}>CONNECT WALLET</div>
    </button>
  )
}

export default WalletButton