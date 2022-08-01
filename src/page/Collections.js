import React, { useState, useEffect } from "react";
import loading from "../assets/loading.svg"
import website from "../assets/website.svg"
import discord from "../assets/discord.svg"
import twitter from "../assets/twitter.svg"
import opensea from "../assets/opensea.svg"
import formatPeriod from "../utils/formatPeriod";
import { faArrowTrendDown, faArrowTrendUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from 'axios';
import { Link, useLocation } from "react-router-dom";

const Collections = () => {
  const [collection, setCollection] = useState([])
  const [load, setLoad] = useState(true)
  const [period, setPeriod] = useState(60)
  useEffect(() => {
    fetchCollection(period)
  }, [period])
  const fetchCollection = async (period) => {
    const openSeaData = await axios.get(`https://api.nftinit.io/api/getTrendingCollections/?format=json&period=${period}`)
    console.log("openSeaData", openSeaData)
    setLoad(false)
    setCollection(openSeaData.data)
  }
  const handlePeriod = (period) => {
    setPeriod(period)
  }
  return (
    <div className="px-6">
      {load ?
        <div className="flex justify-center items-center h-screen">
          <img src={loading} alt="load" className="w-24 h-24" />
        </div> :
        <div className="mt-8">
          <div className="flex justify-between">
            <div className="text-white bg-gradient-to-r from-green-400 to-blue-500 px-3 py-2 rounded text-xl">Trending</div>
            <div className="text-white flex space-x-4 items-center">
              <div>Period:</div>
              <div className="space-x-4">
                <button className={"hover:text-gray-500 py-0.5 px-1 " + (period === Number(30) ? 'bg-gradient-to-r from-green-400 to-blue-500 rounded' : '')} onClick={() => handlePeriod(30)}>30 m</button>
                <button className={"hover:text-gray-500 py-0.5 px-1 " + (period === Number(60) ? 'bg-gradient-to-r from-green-400 to-blue-500 rounded' : '')} onClick={() => handlePeriod(60)}>1 h</button>
                <button className={"hover:text-gray-500 py-0.5 px-1 " + (period === Number(240) ? 'bg-gradient-to-r from-green-400 to-blue-500 rounded' : '')} onClick={() => handlePeriod(240)}>4 h</button>
                <button className={"hover:text-gray-500 py-0.5 px-1 " + (period === Number(1440) ? 'bg-gradient-to-r from-green-400 to-blue-500 rounded' : '')} onClick={() => handlePeriod(1440)}>1 d</button>
              </div>
            </div>
          </div>
          <table className="w-full text-white mt-2">
            <thead className="bg-blue-830 text-left pointer-events-none">
              <tr className="pointer-events-none">
                <th className="py-4 pl-8">COLLECTIONS</th>
                <th>{formatPeriod(period)} SALES</th>
                <th>{formatPeriod(period)} VOLUME</th>
                <th>MAX SALE</th>
                <th>FLOOR</th>
                <th>EXPLORE</th>
                {/* <th>VOLUME 1 / 7 / 30 DAYS</th> */}
              </tr>
            </thead>
            {collection &&
              <tbody>{collection.map((item, i) =>
                <tr key={i}>
                  <td className="py-2">
                    <Link
                      to={`/analysis/${item.slug}`}
                      state={item.id}
                      className="flex items-center space-x-8"
                    >
                      <img src={item.image} alt="img" className="w-10 h-10 rounded" />
                      <div className="flex items-center">
                        <div>
                          <div>{item.name}</div>
                          <div>{item.assets} assets</div>
                        </div>
                      </div>
                    </Link>
                  </td>
                  <td>
                    <div className="space-y-1">
                      <div className="text-xl">{item.sales}</div>
                      {item.sales_percentage > 0 ?
                        <div className="flex text-sm space-x-1 ">
                          <FontAwesomeIcon icon={faArrowTrendUp} className="w-5 h-5 text-green-700" />
                          <div>{item.sales_percentage}%</div>
                        </div> :
                        <div className="flex text-sm space-x-1">
                          <FontAwesomeIcon icon={faArrowTrendDown} className="w-5 h-5 text-red-75" />
                          <div>{Math.abs(item.sales_percentage)}%</div>
                        </div>
                      }
                    </div>
                  </td>
                  <td>
                    <div className="space-y-1">
                      <div className="text-xl">{Math.floor(item.volume * 10) / 10}</div>
                      {item.volume_percentage > 0 ?
                        <div className="flex text-sm space-x-1">
                          <FontAwesomeIcon icon={faArrowTrendUp} className="w-5 h-5 text-green-700" />
                          <div>{item.volume_percentage}%</div>
                        </div> :
                        <div className="flex text-sm space-x-1">
                          <FontAwesomeIcon icon={faArrowTrendDown} className="w-5 h-5 text-red-75" />
                          <div>{Math.abs(item.volume_percentage)}%</div>
                        </div>
                      }
                    </div>
                  </td>
                  <td>
                    <div className="space-y-1">
                      <div className="text-xl">{Math.floor(item.max_sale * 100) / 100}</div>
                      {item.max_sale_percentage > 0 ?
                        <div className="flex text-sm space-x-1">
                          <FontAwesomeIcon icon={faArrowTrendUp} className="w-5 h-5 text-green-700" />
                          <div>{item.max_sale_percentage}%</div>
                        </div> :
                        <div className="flex text-sm space-x-1">
                          <FontAwesomeIcon icon={faArrowTrendDown} className="w-5 h-5 text-red-75" />
                          <div>{Math.abs(item.max_sale_percentage)}%</div>
                        </div>
                      }
                    </div>
                  </td>
                  <td>{Math.floor(item.floor_price * 1000) / 1000}</td>
                  <td>
                    <div className="flex space-x-3">
                      {item.image && <a href={item.image}><img src={opensea} alt="load" className="w-7 h-7" /></a>}
                      {item.discord_url && <a href={item.discord_url}><img src={discord} alt="load" className="w-7 h-7" /></a>}
                      {item.twitter_username && <a href={`https://twitter.com/${item.twitter_username}`}><img src={twitter} alt="load" className="w-7 h-7" /></a>}
                      {item.website && <a href={item.website}><img src={website} alt="load" className="w-7 h-7" /></a>}
                    </div>
                  </td>
                  {/* <td>
                    {item && 
                      <div className="flex space-x-4">
                      <div className="bg-green-700 px-2 py-1">{Math.floor(item.one_day_volume)}</div>
                      <div className="bg-green-700 px-2 py-1">{Math.floor(item.seven_day_volume)}</div>
                      <div className="bg-green-700 px-2 py-1">{Math.floor(item.thirty_day_volume)}</div>
                      </div>
                    }
                  </td> */}
                </tr>
              )}
              </tbody>
            }
          </table>
        </div>
      }
    </div>
  );
};

export default Collections;