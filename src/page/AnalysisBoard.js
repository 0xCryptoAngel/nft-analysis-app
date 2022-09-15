import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useParams, useLocation } from "react-router-dom";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import Clipboard from '../assets/Clipboard.svg';
import randomColor from '../utils/randomColor';
import ClipboardOrigin from '../assets/ClipboardOrigin.svg';
import OutWebsite from '../assets/OutWebsite.svg';
import listedData from '../utils/listedData';
import areaChartFilter from '../utils/areaChartFilter';
import priceChart from '../utils/priceChart';
import ether from "../assets/ether.svg"
import website from "../assets/website.svg"
import discord from "../assets/discord.svg"
import twitter from "../assets/twitter.svg"
import loading from "../assets/loading.svg"
import opensea from "../assets/opensea.svg"
import salesChart from '../utils/salesChart';
import TradingViewWidget, { Themes } from "react-tradingview-widget";

import {
  ResponsiveContainer,
  ComposedChart,
  BarChart,
  ScatterChart,
  AreaChart,
  Area,
  Bar,
  XAxis,
  YAxis,
  ZAxis,
  CartesianGrid,
  Tooltip,
  Cell,
  Scatter
} from "recharts";

const AnalysisBoard = () => {
  const param = useParams();
  const { state } = useLocation();

  const [collection, setCollection] = useState();
  const [floorPrice, setFloorPrice] = useState();
  const [listing, setListing] = useState([]);
  const [listedCount, setListedCount] = useState();
  const [volume, setVolume] = useState();
  const [sales, setSales] = useState();
  const [isClipboard1, setIsClipboard1] = useState(false);
  const [nft, setNft] = useState('');
  const [isLoad, setIsLoad] = useState(false);
  const [salesData, setSalesData] = useState([]);
  const [period, setPeriod] = useState('1');
  const [periodList, setPeriodList] = useState('1');
  const [timestamp, setTimestamp] = useState(1661779045)
  const [saleRange, setSaleRange] = useState('1H')
  const [listedAssets, setlistedAssets] = useState()
  const [test, setTest] = useState(0)
  useEffect(()=> {
    console.log("period", period)
    switch (Number(period)) {
      case 1:
        fetchPrice(period);
        break;
      case 3:
        fetchPrice(period);
        break;
      case 6:
        fetchPrice(period);
        break;
      case 24:
        fetchPrice(period);
    }

    switch (Number(periodList)) {
      case 1:
        fetchListing(periodList);
        break;
      case 3:
        fetchListing(periodList);
        break;
      case 6:
        fetchListing(periodList);
        break;
      case 24:
        fetchListing(periodList);
    }

    switch (saleRange) {
      case '1H':
        fetchRank(saleRange);
        break;
      case '4H':
        fetchRank(saleRange);
        break;
      case '12H':
        fetchRank(saleRange);
        break;
      case '1D':
        fetchRank(saleRange);
    }
  }, [period, periodList, saleRange])
  useEffect(() => {
    fetchCollection()
    fetchPrice(period)
    fetchlistedCount()
    fetchVolume()
    fetchSales()
    fetchListing(periodList)
    fetchRank(saleRange)
  }, [])

  useEffect(() => {
    setTimeout(() => {
      fetchListedAssets()
    }, 5000);
  }, [listedAssets])
  const fetchCollection = async () => {
    setIsLoad(true)
    const openSeaData = await axios.get(`https://api.opensea.io/api/v1/collection/${param.collectionName}`, { headers: { "x-api-key": "b410249ba9b14309afd104ee97497485" } })

    setCollection(openSeaData.data.collection)
    setNft(openSeaData.data.collection?.primary_asset_contracts[0].address)
    setIsLoad(false)
  }
  const fetchPrice = async (_period) => {
    const openSeaData = await axios.get(`https://44.201.239.242:5000/api/collection/FloorPrice?timestamp=${timestamp}&collectionName=${param.collectionName}`)
    let sortedData = []
    openSeaData.data?.map((item, index)=> {
      if(index % Number(_period) == 0) {
        sortedData.push(item)
      }
    })
    setFloorPrice(sortedData);
  }

  const fetchlistedCount = async () => {
    const openSeaData = await axios.get(`https://44.201.239.242:5000/api/collection/ListedCount?collectionName=${param.collectionName}`)
    setListedCount(listedData(openSeaData.data));
    
  }

  const fetchVolume = async () => {
    // const openSeaData = await axios.get(`https://api.nftinit.io/api/chart/?password=Gunah4423_&slug=${param.collectionName}&type=one_day_volume&start=1662127896`)
    const openSeaData = await axios.get(`https://44.201.239.242:5000/api/collection/OneDayVolume?timestamp=1662127896&collectionName=${param.collectionName}`)
    let currentDate = new Date();
    let dateValue = currentDate.getDate();
    let monthValue = currentDate.getMonth() + 1;
    let yearValue = currentDate.getYear();

    if(openSeaData.data.length === 0) {
      setVolume([{one_day_volume: 0, timestamp: `${dateValue - 7}-${monthValue}-${yearValue} 12:00:00`}, {one_day_volume: 0, timestamp: `${dateValue}-${monthValue}-${yearValue} 12:00:00`}])
    } else {
      setVolume(openSeaData.data);
    }
  }

  const fetchSales = async () => {
    // const openSeaData = await axios.get(`https://api.nftinit.io/api/chart/?password=Gunah4423_&slug=${param.collectionName}&type=one_day_sales&start=1662128662`)
    const openSeaData = await axios.get(`https://44.201.239.242:5000/api/collection/OneDaySales?timestamp=1662128662&collectionName=${param.collectionName}`)
    let currentDate = new Date();
    let dateValue = currentDate.getDate();
    let monthValue = currentDate.getMonth() + 1;
    let yearValue = currentDate.getYear();

    if(openSeaData.data.length === 0) {
      console.log("-----------")
      setSales([{one_day_sales: 0, timestamp: `${dateValue - 7}-${monthValue}-${yearValue} 12:00:00`}, {one_day_sales: 0, timestamp: `${dateValue}-${monthValue}-${yearValue} 12:00:00`}])
    } else {
      setSales(openSeaData.data);
    }
  }

  const fetchListing = async (_period) => {
    const listingData = await axios.get(`https://44.201.239.242:5000/api/collection/ListedCount?collectionName=${param.collectionName}`)
    let sortedData = []
    listingData.data?.map((item, index)=> {
      if(index % Number(_period) == 0) {
        sortedData.push(item)
      }
    })
    setListing(areaChartFilter(sortedData))
  }
  const fetchRank = async (_range) => {
    console.log('_range', _range)
    const sales = await axios.get(`https://44.201.239.242:5000/api/collection/SaleChart?&period=${_range}&collectionName=${param.collectionName}`)
    let data = salesChart(sales)
    setSalesData(data)
  }
  const fetchListedAssets = async () => {

    const listedAssets = await axios.get(`https://44.201.239.242:5000/api/collection/ListedAssets?collectionName=${param.collectionName}`)
    console.log("listedAssets", listedAssets.data) 
    setlistedAssets(listedAssets.data)
  }
  const clipboardPan1 = () => {
    setIsClipboard1(true)
    setTimeout(() => {
      setIsClipboard1(false)
    }, "1000")
  }

  const CustomizedAxisTick = (props) => {
    const { x, y, stroke, payload } = props;
    return (
      <g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dy={16} textAnchor="end" fontSize={12} fill="#666">
          {payload.value && priceChart(payload.value)}
        </text>
      </g>
    );
  }

  const divStyle = {
    color: 'blue',
  };


  return (
    <>
    {isLoad? 
      <div className="flex h-screen justify-center items-center">
        <img src={loading} alt="load" className="w-24 h-24"/>
      </div>
    :
      <div>
        <div className="text-white max-w-7xl mx-auto flex justify-between">
          <div className="py-8 flex space-x-8 w-120">
            <img src={collection?.banner_image_url} alt="banner" className="w-40 h-40"/>
            <div>
              <div className="text-4xl font-bold">{collection?.name}</div>
              <div className="flex items-center space-x-2 py-2">
                <div className="text-sm">{nft}</div>
                <CopyToClipboard text={nft} >
                  <button onClick={clipboardPan1} >
                    {isClipboard1?<img src={Clipboard} alt="copy" className="w-4 h-4"/>:<img src={ClipboardOrigin} alt="ClipboardOrigin" className="w-4 h-4"/>}
                  </button>
                </CopyToClipboard>
                <a href={`https://etherscan.io/address/${nft}`} target="_blank" rel="noreferrer">
                  <img src={OutWebsite} alt="outwebsite" className="w-4 h-4"/>
                </a>
              </div>
              <div className="flex space-x-8 py-4">
                <div className="bg-blue-860 rounded-full px-4 py-0.5">Created Date : {new Date(collection?.created_date).toDateString()}</div>
                <div className="bg-blue-860 rounded-full px-4 py-0.5">Total Supply : {collection?.stats.total_supply}</div>
              </div>
              <div>{collection?.description}</div>
            </div>
          </div>
          <div className="py-8 w-96 flex flex-col items-center">
            <div>
              <div>Project Info</div>
              <div className="flex space-x-3 py-2">
                {collection?.discord_url && <a href={collection?.discord_url}><img src={discord} alt="load" className="w-7 h-7" /></a>}
                {collection?.twitter_username && <a href={`https://twitter.com/${collection?.twitter_username}`}><img src={twitter} alt="load" className="w-7 h-7" /></a>}
                {collection?.external_url && <a href={collection?.external_url}><img src={website} alt="load" className="w-7 h-7" /></a>}
              </div>
            </div>
            <div className="flex border border-blue-820 p-2 my-4">
              <div className="border-r border-blue-820 px-4">
                <div>OS Floor</div>
                <div className="flex items-center text-2xl font-bold space-x-2"><img src={ether} alt="ether" className="w-5 h-5"/>{collection?.stats?.floor_price && <div>{collection?.stats?.floor_price.toFixed(3)}</div>}</div>
              </div>
              <div className="px-4">
                <div>OS Total Volume</div>
                <div className="flex items-center text-2xl font-bold space-x-2"><img src={ether} alt="ether" className="w-5 h-5"/>{collection?.stats?.total_volume && <div>{collection?.stats?.total_volume.toFixed(2)}</div>}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t-4 border-blue-820 pt-24 bg-gradient-to-b from-blue-810 to-blue-840">
          <div className="text-white max-w-7xl mx-auto flex justify-between ">
            <div className="bg-blue-860 w-76 flex p-4 justify-between">
              <div>
                <div className="text-xs text-gray-300 font-bold">Floor Price</div>
                <div className="space-x-1"> <span className="text-2xl font-bold">{collection?.stats?.floor_price.toFixed(3)}</span><span className="text-sm font-bold">ETH</span></div>
                <div>---</div>
              </div>
              <div className="flex flex-col">
                <div className="text-xs text-gray-300">Weekly growth</div>
                  <AreaChart
                    width={150}
                    height={50}
                    data={floorPrice}
                    margin={{
                      top: 10,
                      right: 0,
                      left: 0,
                      bottom: 5,
                    }}
                  >
                    <defs>
                      <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#82ca9d" stopOpacity={1}/>
                        <stop offset="100%" stopColor="#82ca9d" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <Area type="monotone" dataKey="floor_price" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" strokeWidth={2} />
                  </AreaChart>
                <div className="flex justify-between text-xs">
                  <div>7d ago</div>
                  <div>now</div>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-860 w-76 flex p-4 justify-between">
              <div>
                <div className="text-xs text-gray-300 font-bold">Listed Assets</div>
                <div className="space-x-1"> <span className="text-2xl font-bold">{listedCount && listedCount[listedCount?.length - 1]?.listed_count}</span><span className="text-sm font-bold">/{collection?.stats?.total_supply}</span></div>
                <div>---</div>
              </div>
              <div className="flex flex-col">
                <div className="text-xs text-gray-300">Weekly growth</div>
                  <AreaChart
                    width={150}
                    height={50}
                    data={listedCount}
                    margin={{
                      top: 10,
                      right: 0,
                      left: 0,
                      bottom: 5,
                    }}
                  >
                    <defs>
                      <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#82ca9d" stopOpacity={1}/>
                        <stop offset="100%" stopColor="#82ca9d" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <Area type="monotone" dataKey="listed_count" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" strokeWidth={2} />
                  </AreaChart>
                <div className="flex justify-between text-xs">
                  <div>7d ago</div>
                  <div>now</div>
                </div>
              </div>
            </div>

            <div className="bg-blue-860 w-76 flex p-4 justify-between">
              <div>
                <div className="text-xs text-gray-300 font-bold">24h Volume</div>
                <div className="space-x-1"> <span className="text-2xl font-bold">{collection?.stats?.one_day_volume.toFixed(3)}</span><span className="text-sm font-bold">ETH</span></div>
                <div>---</div>
              </div>
              <div className="flex flex-col">
                <div className="text-xs text-gray-300">24h growth</div>
                  <AreaChart
                    width={150}
                    height={50}
                    data={volume}
                    margin={{
                      top: 10,
                      right: 0,
                      left: 0,
                      bottom: 5,
                    }}
                  >
                    <defs>
                      <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#82ca9d" stopOpacity={1}/>
                        <stop offset="100%" stopColor="#82ca9d" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <Area type="monotone" dataKey="one_day_volume" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" strokeWidth={2} />
                  </AreaChart>
                <div className="flex justify-between text-xs">
                  <div>7d ago</div>
                  <div>now</div>
                </div>
              </div>
            </div>

            <div className="bg-blue-860 w-76 flex p-4 justify-between">
              <div>
                <div className="text-xs text-gray-300 font-bold">24h Trades</div>
                <div className="space-x-1"> <span className="text-2xl font-bold">{collection?.stats?.one_day_sales.toFixed(0)}</span></div>
                <div>---</div>
              </div>
              <div className="flex flex-col">
                <div className="text-xs text-gray-300">24h growth</div>
                  <AreaChart
                    width={150}
                    height={50}
                    data={sales}
                    margin={{
                      top: 10,
                      right: 0,
                      left: 0,
                      bottom: 5,
                    }}
                  >
                    <defs>
                      <linearGradient id="colorTr" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#82ca9d" stopOpacity={1}/>
                        <stop offset="100%" stopColor="#82ca9d" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <Area type="monotone" dataKey="one_day_sales" stroke="#82ca9d" fillOpacity={1} fill="url(#colorTr)" strokeWidth={2} />
                  </AreaChart>
                <div className="flex justify-between text-xs">
                  <div>7d ago</div>
                  <div>now</div>
                </div>
              </div>
            </div>
            
          </div>
        </div>
        <div className="flex justify-between pt-12 px-8">
          <div className="w-1/6 overflow-y-auto h-screen pr-2">
            <div className="text-white">Listings</div> 
            {
              listedAssets && 
              listedAssets.map((item, i) => 
              <div className="text-white my-2 flex justify-between" key={i}>
                  <img src={item.image} alt="banner" className="w-10 h-10"/>
                  <div className="text-xs">
                    <div>TokenId: #{item.token_id}</div>
                    <div>Ranking: #{item.rank}</div>
                  </div>
                  <div className="text-xs">
                    {Math.floor((new Date() - new Date(item. event_date)) / 1000)} sec ago
                  </div>
                  <div>
                    <div className="flex items-center">
                      <img src={ether} alt="ether" className="w-4 h-4"/>
                      <div>{item.event_price.toFixed(4)}</div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <a href={item.permalink} target="_blank" rel="noreferrer">
                        <img src={opensea} alt="opensea" className="w-4 h-4"/>
                      </a>
                      <button className="text-xs bg-gray-400 rounded px-2 py-0.5">Buy</button>
                    </div>
                  </div>
              </div>)
            }
          </div>
          <div className="w-3/5 mx-auto">
            <div className="flex justify-between">
              <div className="w-3/7 space-y-2 bg-blue-860 rounded-xl">
                <div className="flex items-center py-2 space-x-4 pl-2">
                  <div className="text-white text-xl font-bold">Assets for sale</div>
                  <div className="flex items-center space-x-2 text-sm">
                    <div className="text-white ">Period</div>
                    <select className="bg-blue-860 text-white border border-white rounded" value={periodList} onChange={(e)=>setPeriodList(e.target.value)}>
                      <option value="1">1H</option>
                      <option value="3">3H</option>
                      <option value="6">6H</option>
                      <option value="24">1D</option>
                    </select>
                  </div>
                </div>
                <div className="bg-blue-860 p-2 rounded-xl">
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart
                      width={400}
                      height={300}
                      data={listing}
                      margin={{
                        top: 0,
                        right: 0,
                        left: 0,
                        bottom: 0,
                      }}
                    >
                      <defs>
                        <linearGradient id="listing" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#423FA8" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#423FA8" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="timestamp" interval={Math.floor(listing.length / 10)} tick={<CustomizedAxisTick />} />
                      <YAxis tick={{fontSize: 12}} />
                      <Tooltip />
                      <Area type="monotone" dataKey="listed_count" stroke="#423FA8" fillOpacity={1} fill="url(#listing)"  />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="w-3/7 space-y-2 bg-blue-860 rounded-xl">
                <div className="flex items-center py-2 space-x-4 pl-2">
                  <div className="text-white text-xl font-bold">Floor Price</div>
                  <div className="flex items-center space-x-2 text-sm">
                    <div className="text-white ">Period</div>
                    <select className="bg-blue-860 text-white border border-white rounded" value={period} onChange={(e)=>setPeriod(e.target.value)}>
                      <option value="1">1H</option>
                      <option value="3">3H</option>
                      <option value="6">6H</option>
                      <option value="24">1D</option>
                    </select>
                  </div>
                </div>
                <div className="p-2">
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart
                      width={400}
                      height={300}
                      data={floorPrice}
                      margin={{
                        top: 0,
                        right: 0,
                        left: 0,
                        bottom: 0,
                      }}
                    >
                      <defs>
                        <linearGradient id="floorPrice" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#ED434B" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#ED434B" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="timestamp" interval={Math.floor(floorPrice?.length / 10)} tick={<CustomizedAxisTick />} />
                      <YAxis tick={{fontSize: 12}} />
                      <Tooltip />
                      <Area type="monotone" dataKey="floor_price" stroke="#ED434B" fillOpacity={1} fill="url(#floorPrice)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="bg-blue-860 rounded-xl my-4">
              <div className="flex pl-2 items-center space-x-2">
                <div className="text-white text-xl font-bold text-center py-2">Sales / Ranking</div>
                <div className="text-white ">Range</div>
                <select className="bg-blue-860 text-white border border-white rounded" value={saleRange} onChange={(e)=>setSaleRange(e.target.value)}>
                  <option value="1H">1H</option>
                  <option value="4H">4H</option>
                  <option value="12H">12H</option>
                  <option value="1D">1D</option>
                </select>
              </div>
              <div className="">
                <ResponsiveContainer width="100%" height={400}>
                  <ComposedChart
                    width={1400}
                    height={800}
                    data={salesData}
                    margin={{
                      top: 20,
                      right: 20,
                      bottom: 20,
                      left: 20,
                    }}
                  >
                    <XAxis dataKey="event_date" interval={Math.floor(salesData.length / 10)} tick={<CustomizedAxisTick />} />
                    <YAxis dataKey="event_price" tick={{fontSize: 12}} />
                    <ZAxis type="number" range={[20]} />
                    <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                    {/* <Bar dataKey="event_price" barSize={80} fill="#413ea0" /> */}
                    <Scatter name="A school" dataKey="event_price">
                      {salesData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={randomColor()} />
                      ))}
                    </Scatter>
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="h-96 pt-8">
              <TradingViewWidget
                symbol="NASDAQ:AAPL"
                theme={Themes.DARK}
                locale="es"
                autosize
              />
            </div>
          </div>
          <div className="w-1/6">
            <div className="text-white">Trades</div>
           
          </div>
        </div>
      </div>
    }
    
    </>
  );
};

export default AnalysisBoard;