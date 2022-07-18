import React from "react";
import logo from "../assets/logo.svg"
import { faSearch, faGasPump } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useLocation  } from "react-router-dom";
import  WalletButton  from './WalletButton'

const Navbar = () => {
  let location = useLocation();

  return (
    <div className="text-white flex items-center border-b border-gray-500 justify-between px-8">
      <div className="flex items-center space-x-16">
        <Link to="/">
          <div className="w-10 h-10"><img src={logo} alt="logo" /></div>
        </Link>
        <ul className="flex space-x-10">
          <Link to="/#">
            <li className="border-b-4 border-blue-900 hover:border-red-75 py-4">Collections</li>
          </Link>
          <Link to="/#">
            <li className="border-b-4 border-blue-900 hover:border-red-75  py-4"> Deal Sinper</li>
          </Link>
          <Link to="/">
            <li className={"border-b-4  hover:border-red-75  py-4 " + (location.pathname === '/' ? 'border-red-75' : 'border-blue-900')}>Mint Bot</li>
          </Link>
          <Link to="/wallet-manager">
            <li className={"border-b-4  hover:border-red-75  py-4 " + (location.pathname === '/wallet-manager' ? 'border-red-75' : 'border-blue-900')}>Wallet Manager</li>
          </Link>
        </ul>
      </div>
      <div className="flex items-center space-x-4"> 
        <div className="flex">
          <div className="text-red-75 relative z-10 flex items-center">
            <FontAwesomeIcon icon={faSearch}  className="w-5 h-5"/>
          </div>
          <input type="text" placeholder="Search Collection" className="-ml-8 bg-blue-900 border border-gray-500 rounded py-2 pl-10 pr-24"/>
        </div>
        <div>1 points</div>
        <WalletButton/>
        <div className="text-red-75 flex items-center">
          <FontAwesomeIcon icon={faGasPump}  className="w-5 h-5"/>
          <div className="text-white">16.95</div>
        </div>
      </div>
    
    </div>
  );
};

export default Navbar;