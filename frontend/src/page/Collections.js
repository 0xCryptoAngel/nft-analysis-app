import React, { useState, useEffect }  from "react";
import loading from "../assets/loading.svg"
import formatData from "../utils/formatAddress";
import axios from 'axios';

const Collections =  () => {
  const [collection, setCollection] = useState([])
  const [load, setLoad] = useState(true)
  useEffect(async ()=> {
    fetchCollection()
  }, [])
  const fetchCollection = async () => {
    const openSeaData = await axios.get('/collections')
    console.log("openSeaData.data.collections", openSeaData.data.result)
    setLoad(false)
    setCollection(openSeaData.data.result)
  }
  return (
    <div className="px-6">
      {load? 
        <div className="flex justify-center items-center h-screen">
          <img src={loading} alt="load" className="w-24 h-24"/>
        </div>:
        <table className="w-full text-white mt-12 ">
          <thead className="bg-blue-830 text-left pointer-events-none">
            <tr className="pointer-events-none">

              <th className="py-4 pl-8">Id</th>
              <th>Collections</th>
              <th>Floor</th>
              <th>Contract Address</th>
              <th>Event Time</th>
              <th>Quantity</th>
            </tr>
          </thead>
          {collection && 
            <tbody>{collection.map((item, i) => 
              <tr key={i}>
                <td className="px-8 py-4">{item.asset_id}</td>
                <td>
                  <div className="flex items-center space-x-4">
                    <img src={item.asset_img_url} alt="img" className="w-8 h-8"/>
                    <div>{item.collection_slug}</div>
                  </div>
                </td>
                <td>{item.event_total_price} {item.event_payment_symbol}</td>
                <td>{formatData(item.event_contract_address)}</td>
                <td>{item.event_time}</td>
                <td>{item.event_quantity}</td>
                
              </tr>)}
            </tbody>
          }
        </table>
      }
    </div>
  );
};

export default Collections;