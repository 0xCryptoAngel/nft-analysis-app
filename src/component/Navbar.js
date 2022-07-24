import React, { useEffect, useState } from "react";
import logo from "../assets/logo.jpg"
import { faSearch, faGasPump } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useLocation  } from "react-router-dom";
import  WalletButton  from './WalletButton'
import Web3 from 'web3'

const Navbar = () => {
  let location = useLocation();
  const [gas, setGas] = useState(0)
  const web3 = new Web3(`https://mainnet.infura.io/v3/${process.env.REACT_APP_INFURA_KEY}`)
  useEffect(()=>
    web3.eth.getGasPrice().then((result) => {
      setGas(web3.utils.fromWei(result, 'Gwei'))
    })
  )
  return (
    <div className="text-white flex items-center border-b border-blue-830 justify-between px-8">
      <div className="flex items-center space-x-12">
        <Link to="/" className="bg-white w-12 h-12 rounded-full flex justify-center items-center">
          <div className=""><img src={logo} alt="logo" className="w-10 h-10 rounded-full" /></div>
        </Link>
        <ul className="flex space-x-10">
          <Link to="/collections">
            <li className={"border-b-4  hover:border-blue-460 py-6 " + (location.pathname === '/collections' ? 'border-blue-460' : 'border-blue-840')}>Collections</li>
          </Link>
          <Link to="/#">
            <li className="border-b-4 border-blue-840 hover:border-blue-460  py-6">Snipe Bot</li>
          </Link>
          <Link to="/">
            <li className={"border-b-4  hover:border-blue-460  py-6 " + (location.pathname === '/' ? 'border-blue-460' : 'border-blue-840')}>Mint Bot</li>
          </Link>
          <Link to="/#">
            <li className="border-b-4 border-blue-840 hover:border-blue-460  py-6">Auto trading</li>
          </Link>
          <Link to="/wallet-manager">
            <li className={"border-b-4  hover:border-blue-460  py-6 " + (location.pathname === '/wallet-manager' ? 'border-blue-460' : 'border-blue-840')}>Wallet Manager</li>
          </Link>
        </ul>
      </div>
      <div className="flex items-center space-x-4"> 
        <div className="text-blue-460  flex items-center">
          <FontAwesomeIcon icon={faGasPump}  className="w-5 h-5"/>
          <div className="text-white pl-2">{gas > 0 ? Number(gas).toFixed(2) : 0 }</div>
        </div>
        <WalletButton/>
      </div>
    
    </div>
  );
};

export default Navbar;