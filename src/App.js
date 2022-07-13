import './App.css';

function App() {
  return (
    <div className="container">
      <div className='title'>Scheduled NFT mint page</div>
      <div className='form'>
        <div className='row'>
          <div className='item'>
            <label>Contract*</label>
            <input type="text" placeholder='input contract address'/>
          </div>
          <div className='item'>
            <label>Price in Eth*</label>
            <input type="text" placeholder='input price'/>
          </div>
          <div className='item'>
            <label>Max Gas(Gwei)*</label>
            <input type="text" placeholder='please gas'/>
          </div>
        </div>

        <div className='row'>
          <div className='item'>
            <label>Function Name*</label>
            <input type="text" placeholder='input function name'/>
          </div>
          <div className='item'>
            <label>Priority Fee(Gwei)*</label>
            <input type="text" placeholder='please input your contract address'/>
          </div>
          <div className='item'>
            <label>Accounts</label>
            <input type="submit" value="Select Accounts"/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
