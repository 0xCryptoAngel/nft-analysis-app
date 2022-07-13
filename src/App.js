import './App.css';

function App() {
  return (
    <div className="container">
      <div className='title'>Scheduled NFT mint page</div>
      <div className='form'>
        <div className='row'>
          <div>
            <label>Contract*</label>
            <input type="text" placeholder='input contract address'/>
          </div>
          <div>
            <label>Price in Eth*</label>
            <input type="text" placeholder='input price'/>
          </div>
          <div>
            <label>Max Gas(Gwei)*</label>
            <input type="text" placeholder='please gas'/>
          </div>
        </div>

        <div>
          <div>
            <label>Contract*</label>
            <input type="text" placeholder='please input your contract address'/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
