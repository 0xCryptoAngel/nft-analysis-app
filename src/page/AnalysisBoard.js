import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import Clipboard from '../assets/Clipboard.svg';
import ClipboardOrigin from '../assets/ClipboardOrigin.svg';
import OutWebsite from '../assets/OutWebsite.svg';
import ether from "../assets/ether.svg"
import website from "../assets/website.svg"
import discord from "../assets/discord.svg"
import twitter from "../assets/twitter.svg"
import loading from "../assets/loading.svg"
import {
  AreaChart,
  Area,
} from "recharts";

const AnalysisBoard = () => {
  const param = useParams();
  const [collection, setCollection] = useState()
  const [isClipboard1, setIsClipboard1] = useState(false)
  const [nft, setNft] = useState('')
  const [isLoad, setIsLoad] = useState(false)
  const data = [
    {
      name: 'Page A',
      uv: 0,
      pv: 0,
      amt: 2400,
    },
    {
      name: 'Page B',
      uv: 0,
      pv: 0,
      amt: 2210,
    },
    {
      name: 'Page C',
      uv: 0,
      pv: 0,
      amt: 2290,
    },
    {
      name: 'Page D',
      uv: 0,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'Page E',
      uv: 0,
      pv: 8800,
      amt: 2181,
    },
    {
      name: 'Page F',
      uv: 0,
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'Page G',
      uv: 0,
      pv: 1300,
      amt: 2100,
    },
  ];

  useEffect(() => {
    fetchCollection()
    fetchPrice()
  }, [])
  const fetchCollection = async () => {
    setIsLoad(true)
    const openSeaData = await axios.get(`https://nameless-garden-35810.herokuapp.com/collections/${param.collectionName}`)
    console.log("openSeaData", openSeaData.data.data.collection)

    setCollection(openSeaData.data.data.collection)
    setNft(openSeaData.data.data.collection?.primary_asset_contracts[0].address)
    setIsLoad(false)
  }
  const fetchPrice = async () => {
    const floor_Price = await axios.get(`https://nameless-garden-35810.herokuapp.com//collection?type=${param.collectionName}`)
    console.log("floor_Price", floor_Price.data.result)
  }
  const clipboardPan1 = () => {
    setIsClipboard1(true)
    setTimeout(() => {
      setIsClipboard1(false)
    }, "1000")
  }

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
            <div className="bg-blue-860 w-76 flex p-2 justify-between">
              <div>
                <div className="text-xs text-gray-300 font-bold">Floor Price</div>
                <div className="space-x-1"> <span className="text-2xl font-bold">{collection?.stats?.average_price.toFixed(3)}</span><span className="text-sm font-bold">ETH</span></div>
                <div>---</div>
              </div>
              <div className="flex flex-col">
                <div className="text-xs text-gray-300">Weekly growth</div>
                  <AreaChart
                    width={150}
                    height={50}
                    data={data}
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
                    <Area type="monotone" dataKey="pv" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" strokeWidth={2} />
                  </AreaChart>
                <div className="flex justify-between text-xs">
                  <div>7d ago</div>
                  <div>now</div>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-860 w-76 flex p-2 justify-between">
              <div>
                <div className="text-xs text-gray-300 font-bold">Listed Assets</div>
                <div className="space-x-1"> <span className="text-2xl font-bold">{collection?.stats?.average_price.toFixed(1)}</span><span className="text-sm font-bold">/1000 (-%)</span></div>
                <div>---</div>
              </div>
              <div className="flex flex-col">
                <div className="text-xs text-gray-300">Weekly growth</div>
                  <AreaChart
                    width={150}
                    height={50}
                    data={data}
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
                    <Area type="monotone" dataKey="uv" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" strokeWidth={2} />
                  </AreaChart>
                <div className="flex justify-between text-xs">
                  <div>7d ago</div>
                  <div>now</div>
                </div>
              </div>
            </div>

            <div className="bg-blue-860 w-76 flex p-2 justify-between">
              <div>
                <div className="text-xs text-gray-300 font-bold">24h Volume</div>
                <div className="space-x-1"> <span className="text-2xl font-bold">{collection?.stats?.average_price.toFixed(3)}</span><span className="text-sm font-bold">ETH</span></div>
                <div>---</div>
              </div>
              <div className="flex flex-col">
                <div className="text-xs text-gray-300">24h growth</div>
                  <AreaChart
                    width={150}
                    height={50}
                    data={data}
                    margin={{
                      top: 10,
                      right: 0,
                      left: 0,
                      bottom: 5,
                    }}
                  >
                    <defs>
                      <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#990033" stopOpacity={1}/>
                        <stop offset="100%" stopColor="#990033" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <Area type="monotone" dataKey="uv" stroke="#990033" fillOpacity={1} fill="url(#colorPv)" strokeWidth={2} />
                  </AreaChart>
                <div className="flex justify-between text-xs">
                  <div>7d ago</div>
                  <div>now</div>
                </div>
              </div>
            </div>

            <div className="bg-blue-860 w-76 flex p-2 justify-between">
              <div>
                <div className="text-xs text-gray-300 font-bold">24h Trades</div>
                <div className="space-x-1"> <span className="text-2xl font-bold">{collection?.stats?.average_price.toFixed(0)}</span></div>
                <div>---</div>
              </div>
              <div className="flex flex-col">
                <div className="text-xs text-gray-300">24h growth</div>
                  <AreaChart
                    width={150}
                    height={50}
                    data={data}
                    margin={{
                      top: 10,
                      right: 0,
                      left: 0,
                      bottom: 5,
                    }}
                  >
                    <defs>
                      <linearGradient id="colorTr" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#990033" stopOpacity={1}/>
                        <stop offset="100%" stopColor="#990033" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <Area type="monotone" dataKey="uv" stroke="#990033" fillOpacity={1} fill="url(#colorTr)" strokeWidth={2} />
                  </AreaChart>
                <div className="flex justify-between text-xs">
                  <div>7d ago</div>
                  <div>now</div>
                </div>
              </div>
            </div>
            
          </div>
        </div>

      </div>
    }
    
    </>
  );
};

export default AnalysisBoard;