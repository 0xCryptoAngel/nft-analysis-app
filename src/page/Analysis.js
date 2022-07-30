import React, { useState, useEffect } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import priceChart from '../utils/priceChart';
import salesChart from '../utils/salesChart';
import areaChartFilter from '../utils/areaChartFilter';
import randomColor from '../utils/randomColor';
import "react-tabs/style/react-tabs.css";
import { useParams, useLocation } from "react-router-dom";
import axios from 'axios';
import {
  ResponsiveContainer,
  BarChart,
  ScatterChart,
  AreaChart,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
  Scatter
} from "recharts";

const Analysis = () => {
  const { state } = useLocation();

  const [collection, setCollection] = useState([])
  const [strength, setStrength] = useState([])
  const [listing, setListing] = useState([])
  const [nftOwner, setNftOwner] = useState([])
  const [salesData, setSalesData] = useState([])
  const param = useParams();

  useEffect(() => {
    fetchCollection()
    fetchStrength()
    fetchListing()
    fetchOwner()
    fetchSales()
  }, [])
  const fetchCollection = async () => {

    const openSeaData = await axios.get(`https://api.nftinit.io/api/chart/?password=Gunah4423_&slug=${param.collectionName}&type=floor_price`)
    setCollection(areaChartFilter(openSeaData.data))
  }
  const fetchStrength = async () => {
    const strengthData = await axios.get(`https://api.nftinit.io/api/get_price_distribution/?c=${state}`)
    setStrength(strengthData.data.items.reverse())
  }
  const fetchListing = async () => {
    const listingData = await axios.get(`https://api.nftinit.io/api/chart/?password=Gunah4423_&slug=${param.collectionName}&type=listed_count`)
    setListing(areaChartFilter(listingData.data))
  }
  const fetchOwner = async () => {
    const nftData = await axios.get(`https://api.nftinit.io/api/get_nfts_per_owner/?c=${state}`)
    setNftOwner(nftData.data.items)
  }
  const fetchSales = async () => {
    const sales = await axios.get(`https://api.nftinit.io/api/sale_chart/?slug=${param.collectionName}&tc=true&tn=true`)
    let data = salesChart(sales)
    console.log("data", data)
    setSalesData(data)
  }
  const CustomizedAxisTick = (props) => {
    const { x, y, stroke, payload } = props;
    return (
      <g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dy={16} textAnchor="end" fill="#666">
          {payload.value && priceChart(payload.value)}
        </text>
      </g>
    );
  }
  const divStyle = {
    color: 'blue',
  };


  return (
    <div className="p-8 flex flex-col space-y-4">
      <div className="flex justify-between">
        <div className="w-1/2 space-y-2">
          <div className="text-white text-xl font-bold text-center">Floor strength</div>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              layout="vertical"
              width={1400}
              height={800}
              data={strength}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5
              }}
            >
              <XAxis type="number" />
              <YAxis type="category" dataKey="price_range" interval={Math.floor(strength.length / 10)} />
              <Tooltip />
              <Bar dataKey="count" fill="#37AEC4" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="w-1/2 space-y-2">
          <div className="text-white text-xl font-bold text-center">Nfts Per Owner</div>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              width={1400}
              height={800}
              data={nftOwner}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5
              }}
            >
              <XAxis dataKey="nft" interval={Math.floor(nftOwner.length / 10)} />
              <YAxis />
              <Tooltip wrapperStyle={divStyle} />
              <Bar dataKey="holder" fill="#37AEC4" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="flex justify-between">
        <div className="w-1/2 space-y-2">
          <div className="text-white text-xl font-bold text-center">Active Listings</div>
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart
              width={1400}
              height={800}
              data={listing}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <defs>
                <linearGradient id="listing" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ED434B" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#ED434B" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="timestamp" interval={Math.floor(listing.length / 10)} tick={<CustomizedAxisTick />} />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="listed_count" stroke="#ED434B" fillOpacity={1} fill="url(#listing)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="w-1/2 space-y-2">
          <div className="text-white text-xl font-bold text-center">Floor Price</div>
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart
              width={1400}
              height={800}
              data={collection}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <defs>
                <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4340A7" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#4340A7" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="timestamp" interval={Math.floor(collection.length / 10)} tick={<CustomizedAxisTick />} />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="floor_price" stroke="#4340A7" fillOpacity={1} fill="url(#colorPv)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="space-y-2">
        <div className="text-white text-xl font-bold text-center">Sales / Ranking</div>
        <ResponsiveContainer width="100%" height={400}>
          <ScatterChart
            width={1400}
            height={800}
            margin={{
              top: 20,
              right: 20,
              bottom: 20,
              left: 20,
            }}
          >
            <XAxis dataKey="event_date" interval={Math.floor(salesData.length / 10)} tick={<CustomizedAxisTick />} />
            <YAxis dataKey="event_price" />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
            <Scatter name="A school" data={salesData}>
              {salesData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={randomColor()} />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Analysis;