import './App.css';
import { useState, useEffect } from 'react'
import WalletButton from './component/WalletButton'
import { useWeb3React } from "@web3-react/core";
import nft from "./config/nft.json"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

// import Web3 from 'web3'
function App() {
  const [address, setAddress] = useState('')
  const [price, setPrice] = useState(0.003)
  const [gas, setGas] = useState(0)
  const [delay, setDelay] = useState(0)
  const [fee, setFee] = useState(0)
  const [date, setDate] = useState(0)
  const [checked, setChecked] = useState(false)
  const [functionName, setFunctionName] = useState([{name:'hello'}])
  const [selctedFunction, setSelectedFunction] = useState('')
  const { active, account, library } = useWeb3React();
  let mintContract;
  // const web3 = new Web3('https://rinkeby.infura.io/v3/a02bdad6cdeb43bfa8fc6577dbff0fd0')

  let amount = 1;
  useEffect(() => {
    if(address.length === 42 && address.includes("0x") && library && active) {
      setChecked(true);
      fetchDate();
      console.log("functionName", functionName)
      // eslint-disable-next-line react-hooks/exhaustive-deps
      mintContract = new library.eth.Contract(nft, address);
      console.log("mintContract", mintContract)
    } else {
      return;
    }

  }, [address]);

  const fetchDate = async () => {
    await axios.get(`https://api-rinkeby.etherscan.io/api?module=contract&action=getabi&address=0x6E962411f2cd5f346c4bAf565567840384596547&apikey=V5AFDNPU5XIJVYSJVBVE3WIEFA91NDZBKR`)
    .then(res => {
      if(res.data.result.length > 10) {
        let temp = JSON.parse(res.data.result);
        console.log("temp", temp)

        
        const results = temp.filter(element => {
          return element.stateMutability === "payable" && element.type === "function" ;
        });
        setFunctionName(results)
      } else {
        return;
      }
    })
  }


  const handleAddress = (e) => {
    setAddress(e.target.value);
  };
  const handlePrice = (e) => {
    setPrice(Number(e.target.value));
  };
  const handleGas = (e) => {
    setGas(Number(e.target.value));
  };
  const handleFee = (e) => {
    setFee(e.target.value);
  };
  const handleDate = (e) => {
    setDate(e.target.value)
    console.log("date", e.target.value)
    if(new Date(e.target.value) > new Date()) {
      let value = new Date(e.target.value)- new Date()
      setDelay(value)
    } else {
      toast.warning("Please set correct schedule date!")
    }
  }
  const mint = async () => {
    if(checked) {
      toast.success("Successed Schedule!!!")
      setTimeout(async () => {
        const _amountOfEther = price * 1000000000000000000;
        try {
          if(active) {
            await mintContract.methods.publicsaleAngel(amount).send({from:account, gas: 15000 * 1000000000, value: _amountOfEther})
            toast.success("Successed Transaction!!!")
          }
        } catch (error) {
          toast.error("Failed Transaction!!!")
          console.log(error);
        }
      }, delay);
    } else {
      toast.warning("You must input contract address")
    }
  };
  return (
    <div className="box-area">
      <div className='nav-bar'>
        <div className='title'>Scheduled NFT mint page</div>
        <WalletButton/>
      </div>
      <div className='form'>
        <div className='row'>
          <div className='item'>
            <label>Contract*</label>
            <input type="text" placeholder='0x6E962411f2cd5f312c4bAf565567840384596547' value={address} onChange={handleAddress}/>
          </div>
          <div className='item'>
            <label>Price in Eth*</label>
            <input type="number" placeholder='input price' value={price} onChange={handlePrice}/>
          </div>
          <div className='item'>
            <label>Max Gas(Gwei)*</label>
            <input type="number" placeholder='please gas' value={gas} onChange={handleGas}/>
          </div>
        </div>

        <div className='row'>
          <div className='item'>
            <label>Function Name*</label>
            <select className=""  onChange={e => setSelectedFunction(e.target.value)}  value={selctedFunction} >
              {functionName.map((item) => (
                <option key={item.name}>{item.name}</option>
              )
              )}
            </select>
          </div>
          <div className='item'>
            <label>Priority Fee(Gwei)*</label>
            <input type="number" placeholder='please input your contract address' value={fee} onChange={handleFee}/>
          </div>
          <div className='item'>
            <label>Schedule</label>
            <input type="date" value={date} onChange={handleDate}/>
          </div>
        </div>
      </div>
      <div className='mint-btn'>
        <button onClick={mint}>Mint</button>
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
}

export default App;
