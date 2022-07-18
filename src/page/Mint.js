import React, { useState, useEffect }  from "react";
import './Mint.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import Web3 from 'web3'

const Mint = () => {
  const [address, setAddress] = useState('')
  const [price, setPrice] = useState(0)
  const [priceFlag, setPriceFlag] = useState(false)
  const [amount, setAmount] = useState(0)
  const [gas, setGas] = useState(0)
  const [delay, setDelay] = useState(0)
  const [fee, setFee] = useState(0)
  const [date, setDate] = useState('')
  const [checked, setChecked] = useState(false)
  const [functionName, setFunctionName] = useState([])
  const [selctedFunction, setSelectedFunction] = useState('')

  
  const web3 = new Web3(`https://rinkeby.infura.io/v3/${process.env.REACT_APP_INFURA_KEY}`)
      
  const [abi, setAbi] = useState(null);
  useEffect(() => {
    if(address.length === 42 && address.includes("0x")) {
      setChecked(true);

      fetchDate(address);
    } else {
      return;
    }

  }, [address]);

  const fetchDate = async (address) => {
    const res = await axios.get(`https://api.etherscan.io//api?module=contract&action=getabi&address=${address}&apikey=${process.env.REACT_APP_ETHER_API}`)
    if(res.data.result.length > 10) {
      let temp = JSON.parse(res.data.result);
      setAbi(temp);
      const results = temp.filter(element => {
        return element.stateMutability === "payable" && element.type === "function" ;
      });
      setFunctionName(results)
    } else {
      return;
    }
  }


  const handleAddress = (e) => {
    setAddress(e.target.value);
  };
  const handleAmount = (e) => {
    setAmount(Number(e.target.value));
  }
  const handlePrice = (e) => {
    if(e.target.value >= 0.003) {
      setPrice(Number(e.target.value));
      setPriceFlag(true)
    } else {
      return
    }
  };
  const handleGas = (e) => {
    setGas(Number(e.target.value));
  };
  const handleFee = (e) => {
    setFee(e.target.value);
  };
  const handleDate = (e) => {
    setDate(e.target.value)
    if(new Date(e.target.value) > new Date()) {
      let value = new Date(e.target.value)- new Date()
      setDelay(value)
    } else {
      toast.warning("Please set correct schedule date!")
    }
  }
  const handleFunction = (e) => {
      setSelectedFunction(e.target.value)
  }
  const mint = async () => {
    if(priceFlag) {
      if(checked) {
        if(!localStorage.getItem('newWallet')) {
          const account_info = web3.eth.accounts.create();
          localStorage.setItem('newWallet', JSON.stringify(account_info));
        } 
        const wallet = localStorage.getItem('newWallet');
        const balance = await web3.eth.getBalance(JSON.parse(wallet).address)
        if(balance <= 0 ) {
          toast.warning(`You must charge Ethereum to your wallet: ${JSON.parse(wallet).address}`)
        } else {
          setTimeout(async () => {
            try {
              const mintContract = new web3.eth.Contract(abi, address);
              const dataValue = mintContract.methods[selctedFunction](amount).encodeABI()
              const gasPrice = await web3.eth.getGasPrice()
              const nonce = await web3.eth.getTransactionCount(JSON.parse(wallet).address, 'latest');
                const createTransaction = await web3.eth.accounts.signTransaction(
                  {
                    to: address, // faucet address to return eth
                    value: price * 10**18,
                    gas: 400000,
                    data: dataValue,
                    maxFeePerGas: gas * 10**9,
                    maxPriorityFeePerGas: fee * 10**9,
                    nonce:nonce,
                  },
                  JSON.parse(wallet).privateKey
              );
          
            web3.eth.sendSignedTransaction(createTransaction.rawTransaction, function(error, hash) {
              if (!error) {
                toast.success(hash);
                console.log("🎉 The hash of your transaction is: ", hash, "\n Check Alchemy's Mempool to view the status of your transaction!");
              } else {
                toast.error(`${error}`);
                console.log("❗Something went wrong while submitting your transaction:", error)
              }
            });
            } catch (error) {
              toast.error("Failed Transaction!!!")
              console.log(error);
            }
          }, delay);
        }
      } else {
        toast.warning("You must input contract address")
      }
    } else {
      toast.warning("You must input big number than 0.003")
    }
  };
  return (
    <div className="box-area">
      <div className='nav-bar'>
        <div className='title'>Scheduled NFT mint page</div>
      </div>
      <div className='wallet-address'>Wallet Address: <span>{JSON.parse(localStorage.getItem('newWallet'))?.address?JSON.parse(localStorage.getItem('newWallet'))?.address:''}</span> </div>
      <div className='form'>
        <div className='row'>
          <div className='item'>
            <label>Contract*</label>
            <input type="text" placeholder='0x701911439890955a72444aB22e442e5954Ea8781' value={address} onChange={handleAddress}/>
          </div>
          <div className='item'>
            <label>Amount*</label>
            <input type="number" placeholder='0' value={amount} onChange={handleAmount} min="0"/>
          </div>
          <div className='item'>
            <label>Max Gas(Gwei)*</label>
            <input type="number" placeholder='250' value={gas} onChange={handleGas}/>
          </div>
          <div className='item'>
            <label>Schedule</label>
            <input type="datetime-local" value={date} onChange={handleDate}/>
          </div>
        </div>

        <div className='row'>
          <div className='item'>
            <label>Function Name*</label>
            <select className=""  onChange={handleFunction}  value={selctedFunction} >
              {functionName.map((item) => (
                <option key={item.name} value={item.name}>{item.name}</option>
              )
              )}
            </select>
          </div>
          <div className='item'>
            <label>Price in Eth*</label>
            <input type="number" placeholder='0.003' value={price} onChange={handlePrice} step="0.001"/>
          </div>
          <div className='item'>
            <label>Priority Fee(Gwei)*</label>
            <input type="number" placeholder='250' value={fee} onChange={handleFee}/>
          </div>
          <div className='mint-btn'>
            <button onClick={mint}>Mint</button>
          </div>
        </div>
      </div>
      
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        />
    </div>
  );
};

export default Mint;