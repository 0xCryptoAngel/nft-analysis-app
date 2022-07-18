import React, { useState, useEffect }  from "react";
import Modal from '../component/Modal'
import Web3 from 'web3'
import formatData from "../utils/formatAddress";

const WalletManager = () => {
  const [modalShow, setModalShow] = useState(false)
  const [address, setAddress] = useState('adfasdfasdfads')
  const [privateKey, setPrivateKey] = useState('123123123')
  const [selectedAmount, setSelectedAmount] = useState(0)
  const [walletInfo, setWalletInfo] = useState([])
  const [walletData, setWalletData] = useState([])
  const web3 = new Web3(`https://rinkeby.infura.io/v3/${process.env.REACT_APP_INFURA_KEY}`)
  const createWallet = (index) => {
    setSelectedAmount(index)
    const account_info = web3.eth.accounts.wallet.create(index);
    setWalletData(account_info);
    console.log("account_info", account_info)
    let data = []
    for (let i = 0; i < index; i++) {
      data.push(
        <div className="flex justify-between bg-blue-850 py-3 px-4 my-1" key={i}>
          <div  className="w-16">Wallet{i + 1}</div>
          <div className="w-28">{formatData(account_info[i].address)}</div>
          <div  className="w-16">&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;</div>
        </div>
      );
      setWalletInfo(data)
    }
  }
  const check = () => {
    console.log("walletInfo", walletInfo)
  }
  
  const walletAmount = [1, 2, 3, 5, 10, 20, 50, 100]
  const GenerateWallet = ({ show, onHide }) => {
    return (
      <Modal show={show} handleClose={onHide}>
        <div className="text-xl">Generate New Wallets</div>
        <div className="py-4 space-y-2">
          <div>How many wallets?</div>
          <div className="flex mr-96">
            {walletAmount.map((item, i) => 
              <button className="w-8 h-8 border hover:text-red-75" onClick={()=>createWallet(item)} key={i}>
                <div>{item}</div>
              </button>
            )}
          </div>
        </div>
        <div className="py-4">
          {walletInfo}
        </div>
        <div className="flex justify-center">
          <div
            className="bg-red-75 py-2 px-4"
            onClick={
              check
            }
          > 
          Save Wallets
          </div>
        </div>
      </Modal>
    )
  }
 
  return (
    <div className="text-white pt-8">
      <div className="flex justify-between items-center px-8">
        <div className="text-2xl">WALLET MANAGER</div>
        <button className="bg-red-75 px-4 py-2" onClick={() => setModalShow(true)}>Generate Wallet</button>
      </div>
      <GenerateWallet show={modalShow} onHide={() => setModalShow(false)}/>
    </div>
  );
};

export default WalletManager;