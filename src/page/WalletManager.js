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
  const [selectedAmount, setSelectedAmount] = useState(0)
  const [walletData, setWalletData] = useState([])
  const [manager, setManager] = useState([])
  const web3 = new Web3(`https://mainnet.infura.io/v3/${process.env.REACT_APP_INFURA_KEY}`)
  useEffect(()=> {
    let result = localStorage.getItem('walletData')
    setCollection(cloneDeep(JSON.parse(result)?.slice(0, 10)));
  }, [manager])

  const createWallet = (index) => {
    setSelectedAmount(index)
    const account_info = web3.eth.accounts.wallet.create(index);
    const data = Object.values(account_info)?.slice(0, index);
    let updatedData = []
    data.forEach((item)=>{
      web3.eth.getBalance(item.address).then((res)=>{
        updatedData.push(
          {
            ...item,
            balance: res,
          }
        )
        setWalletData([...updatedData]); 
      })
    })
  }
  const saveWallets = () => {
    localStorage.setItem('walletData', JSON.stringify(walletData));
    setManager(walletData)
  }
  const walletAmount = [1, 2, 3, 5, 10, 20, 50, 100]
  const updatePage = p => {
    setCurrentPage(p);
    const to = countPerPage * p;
    const from = to - countPerPage;
    setCollection(cloneDeep(manager.slice(from, to)));
  };

  const deleteItem = (index) => {
    let wallet = localStorage.getItem('walletData')
    const result = JSON.parse(wallet)?.filter(item => item.index !== index)
    localStorage.setItem('walletData', JSON.stringify(result));
    setManager(result)
  }
  const GenerateWallet = ({ show, onHide }) => {
    return (
      <Modal show={show} handleClose={onHide}>
        <div className="text-xl">Generate New Wallets</div>
        <div className="py-4 space-y-2">
          <div>How many wallets?</div>
          <div className="flex mr-96">
            {walletAmount.map((item, i) => 
              <button className="w-8 h-8 border hover:text-white font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500" onClick={()=>createWallet(item)} key={i}>
                <div>{item}</div>
              </button>
            )}
          </div>
        </div>
        <div className="h-72 overflow-y-auto my-4">
          {walletData.map((item, i) => (
            <div className="flex justify-between bg-blue-820 border hover:border-blue-400 border-blue-850 py-3 px-4 my-1" key={i}>
              <div  className="w-16">Wallet{i + 1}</div>
              <div className="w-28">{formatData(item.address)}</div>
              <div  className="w-16">&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;</div>
            </div> 
          ))}
        </div>
        <div className="flex justify-center">
          <div
            className="bg-gradient-to-r from-green-400 to-blue-500 rounded py-2 px-4"
            onClick={()=> {
                saveWallets(); 
                setModalShow(false);
              }
            }
          > 
          Add to Manager
          </div>
        </div>
      </Modal>
    )
  }
  return (
    <div className="text-white pt-8">
      <div className="flex justify-between items-center px-8">
        <div className="text-2xl">WALLET MANAGER</div>
        <button className="bg-gradient-to-r from-green-400 to-blue-500 rounded px-4 py-2" onClick={() => setModalShow(true)}>Generate Wallet</button>
      </div>
      <div>
      <div className="m-8 border"> 
        <table className="w-full">
          <thead className="bg-blue-830">
            <tr className="pointer-events-none">
              <th className="py-3">Wallet Name</th>
              <th>Tag</th>
              <th>Total NFT</th>
              <th>ETH</th>
              <th>Action</th>
            </tr>
          </thead>
          {collection && 
            <tbody>{collection.map((item, i) => 
              <tr key={i} className="text-center">
                <td>Wallet Name{item.index + 1}</td>
                <td>{formatData(item.address)}</td>
                <td>0</td>
                <td>{item.balance}</td>
                <td className="py-2">
                  <div className="flex flex-col items-center">
                    <button className="rounded-full bg-white hover:bg-blue-820 hover:text-white w-6 h-6 flex justify-center items-center" onClick={()=>deleteItem(item.index)}>
                      <FontAwesomeIcon icon={faTrash}  className="w-3 h-3 text-black"/>
                    </button>
                    <div className="text-xs text-white">Delete</div>
                  </div>
                </td>
              </tr>)}
            </tbody>
          }
        </table>
        <div className="bg-blue-830 py-3 flex justify-center">
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