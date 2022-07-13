import { useEffect, useCallback } from 'react';
import { useWeb3React } from '@web3-react/core';
import { MetaMaskconnector } from '../config/config';

const WalletButton = () => {

  const { active, activate, account } = useWeb3React()
  useEffect(() => {
    if (active) {
      localStorage.setItem('shouldEagerConnect', true)
    }
  }, [active])
  
  const handleConnectMetaMask = useCallback(() => {
    activate(MetaMaskconnector)
  },[activate])

  return (
    <button className="wallet-btn"> 
      {active? <div>{`${account.slice(0, -36)}...${account.substring(37)}`}</div>:<div className="" onClick={handleConnectMetaMask}>CONNECT</div>}
    </button>
  )
}

export default WalletButton