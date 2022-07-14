import './App.css';
import { useState, useEffect } from 'react'
import WalletButton from './component/WalletButton'
import { useWeb3React } from "@web3-react/core";
import nft from "./config/nft.json"
import date from './assets/calendar.svg';
// import Web3 from 'web3'
function App() {
  const [address, setAddress] = useState('')
  const [price, setPrice] = useState(0.003)
  const [gas, setGas] = useState(0)
  const [fee, setFee] = useState(0)
  const { active, account, library } = useWeb3React();
  let mintContract;
  // const web3 = new Web3('https://rinkeby.infura.io/v3/a02bdad6cdeb43bfa8fc6577dbff0fd0')

  let amount = 1;
  useEffect(() => {
    if(address.length === 42 && address.includes("0x") && library && active) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      mintContract = new library.eth.Contract(nft, address);

    }
  }, [address]);


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
  // const privateKey = '1b40ed37e7bb55dfd5a929ef57458137c6ce6b6b978c508260432deca5be5580';
  const mint = async () => {
    const _amountOfEther = price * 1000000000000000000;
    try {
      if(active) {
        await mintContract.methods.publicsaleAngel(amount).send({from:account, gas: 15000 * 1000000000, value: _amountOfEther})
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleSchedule = () => {
    setTimeout(() => {console.log("this is the first message")}, 5000);
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
            <select className="" >
              <option value="publicsaleAngel">publicsaleAngel</option>
            </select>
          </div>
          <div className='item'>
            <label>Priority Fee(Gwei)*</label>
            <input type="number" placeholder='please input your contract address' value={fee} onChange={handleFee}/>
          </div>
          <div className='item'>
            <label>Schedule</label>
            <input type="date" />
          </div>
        </div>
      </div>
      <div className='mint-btn'>
        <button>Mint</button>
      </div>
    </div>
  );
}

export default App;
