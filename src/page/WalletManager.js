import React, { useState, useEffect }  from "react";
import Modal from '../component/Modal'
import Web3 from 'web3'
import formatData from "../utils/formatAddress";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import cloneDeep from "lodash/cloneDeep";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const WalletManager = () => {
  const countPerPage = 10;
  const [currentPage, setCurrentPage] = React.useState(1);
  const [collection, setCollection] = React.useState([]);
  const [modalShow, setModalShow] = useState(false)
  const [address, setAddress] = useState('adfasdfasdfads')
  const [privateKey, setPrivateKey] = useState('123123123')
  const [selectedAmount, setSelectedAmount] = useState(0)
  const [walletInfo, setWalletInfo] = useState([])
  const [walletData, setWalletData] = useState([])
  const [manager, setManager] = useState([])
  const web3 = new Web3(`https://rinkeby.infura.io/v3/${process.env.REACT_APP_INFURA_KEY}`)
  useEffect(()=> {
    setCollection(cloneDeep(manager.slice(0, 10)));
  }, [manager])

  const createWallet = (index) => {
    setSelectedAmount(index)
    const account_info = web3.eth.accounts.wallet.create(index);
    const data = Object.values(account_info)?.slice(0, index);
    setWalletData(data);
  }
  const saveWallets = () => {
    setManager(walletData)
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
        <div className="h-72 overflow-y-auto my-4">
          {walletData.map((item, i) => (
            <div className="flex justify-between bg-blue-850 py-3 px-4 my-1" key={i}>
              <div  className="w-16">Wallet{i + 1}</div>
              <div className="w-28">{formatData(item.address)}</div>
              <div  className="w-16">&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;</div>
            </div> 
          ))}
        </div>
        <div className="flex justify-center">
          <div
            className="bg-red-75 py-2 px-4"
            onClick={
              saveWallets
            }
          > 
          Add to Manager
          </div>
        </div>
      </Modal>
    )
  }
  const updatePage = p => {
    setCurrentPage(p);
    const to = countPerPage * p;
    const from = to - countPerPage;
    setCollection(cloneDeep(manager.slice(from, to)));
  };

  const deleteItem = (index) => {
    console.log("index", index)
    const result = manager.filter(item => item.index !== index)
    setManager(result)
  }
  return (
    <div className="text-white pt-8">
      <div className="flex justify-between items-center px-8">
        <div className="text-2xl">WALLET MANAGER</div>
        <button className="bg-red-75 px-4 py-2" onClick={() => setModalShow(true)}>Generate Wallet</button>
      </div>
      <div>
      <div className="px-8 py-8"> 
        <table className="w-full">
          <thead className="bg-blue-850">
            <tr>
              <th>Wallet Name</th>
              <th>Tag</th>
              <th>Total Balance</th>
              <th>ETH</th>
              <th>WETH</th>
              <th>Action</th>
            </tr>
          </thead>
          {collection && 
            <tbody>{collection.map((item, i) => 
              <tr key={i}>
                <td>Wallet Name{item.index + 1}</td>
                <td>{formatData(item.address)}</td>
                <td>q</td>
                <td>q</td>
                <td>&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;</td>
                <td>
                  <div className="flex flex-col items-center">
                    <button className="rounded-full bg-white w-6 h-6 flex justify-center items-center" onClick={()=>deleteItem(item.index)}>
                      <FontAwesomeIcon icon={faTrash}  className="w-3 h-3 text-black"/>
                    </button>
                    <div className="text-xs text-white">Delete</div>
                  </div>
                </td>
              </tr>)}
            </tbody>
          }
        </table>
        <div className="bg-blue-850 py-2 flex justify-center">
          <Pagination
            pageSize={countPerPage}
            onChange={updatePage}
            current={currentPage}
            total={walletData.length}
          />
        </div>
      </div>
      
      </div>
      <GenerateWallet show={modalShow} onHide={() => setModalShow(false)}/>
    </div>
  );
};

export default WalletManager;