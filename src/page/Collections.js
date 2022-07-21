import React, { useState, useEffect }  from "react";
import demo from "../assets/demo.png"
import loading from "../assets/loading.svg"
import axios from 'axios';

const Collections =  () => {
  const [collection, setCollection] = useState([])
  const [load, setLoad] = useState(true)
  useEffect(async ()=> {
    fetchCollection()
  }, [])
  const fetchCollection = async () => {
    const openSeaData = await axios.get('https://api.opensea.io/api/v1/collections')
    console.log("openSeaData.data.collections", openSeaData.data.collections)
    setLoad(false)
    setCollection(openSeaData.data.collections)
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
              <th className="py-4 pl-8">Collections</th>
              <th>Floor</th>
            </tr>
          </thead>
          {collection && 
            <tbody>{collection.map((item, i) => 
              <tr key={i}>
                <td className="px-8 py-4">
                  <div className="flex items-center space-x-4">
                    <img src={item.image_url?item.image_url:demo} alt="img" className="w-8 h-8"/>
                    <div>{item.name}</div>
                  </div>
                </td>
                <td>{item.stats.floor_price}</td>
              </tr>)}
            </tbody>
          }
        </table>
      }
    </div>
  );
};

export default Collections;