import React, { useState, useEffect }  from "react";
import Modal from '../component/Modal'
import Web3 from 'web3'

const WalletManager = () => {
  const [modalShow, setModalShow] = useState(false)
  const GenerateWallet = ({ show, onHide }) => {
    return (
      <Modal show={show} handleClose={onHide}>
        <div className="text-xl">Generate New Wallets</div>
        <div className="py-4 space-y-2">
          <div>How many wallets?</div>
          <div className="flex mr-96">
            <button className="w-8 h-8 border">
              <div>1</div>
            </button>
            <button className="w-8 h-8 border">
              <div>2</div>
            </button>
            <button className="w-8 h-8 border">
              <div>3</div>
            </button>
            <button className="w-8 h-8 border">
              <div>5</div>
            </button>
            <button className="w-8 h-8 border">
              <div>10</div>
            </button>
            <button className="w-8 h-8 border">
              <div>20</div>
            </button>
            <button className="w-8 h-8 border">
              <div>50</div>
            </button>
            <button className="w-8 h-8 border">
              <div>100</div>
            </button>
          </div>
        </div>
        <div className="flex justify-center">
          <div
            className="bg-red-75 py-2 px-4"
            onClick={() => {
              setModalShow(false)
            }}
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