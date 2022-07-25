import React, { useState, useEffect } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import axios from 'axios';
import {
  ResponsiveContainer,
  ComposedChart,
  LineChart,
  BarChart,
  ScatterChart, 
  AreaChart,
  Area,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Scatter
} from "recharts";

const Analysis = () => {
  const [collection, setCollection] = useState([])
  const [strength, setStrength] = useState([])
  const [listing, setListing] = useState([])
  const [nftOwner, setNftOwner] = useState([])
  const [salesData, setSalesData] = useState([])
  useEffect(()=> {
    fetchCollection()
  }, [])
  const fetchCollection = async () => {
    const openSeaData = await axios.get("https://api.nftinit.io/api/chart/?password=Gunah4423_&slug=boredapeyachtclub&type=floor_price")
    console.log("openSeaData.data", openSeaData.data)
    setCollection(openSeaData.data)
  }
  const fetchStrength = async ()=> {
    const strengthData = await axios.get("https://api.nftinit.io/api/get_price_distribution/?c=2")
    console.log("openSeaData.data", strengthData.data.items)
    setStrength(strengthData.data.items)
  }
  const fetchListing = async () => {
    const listingData = await axios.get("https://api.nftinit.io/api/chart/?password=Gunah4423_&slug=boredapeyachtclub&type=listed_count")
    console.log("openSeaData.data", listingData.data)
    setListing(listingData.data)
  }
  const fetchOwner = async () => {
    const nftData = await axios.get("https://api.nftinit.io/api/get_nfts_per_owner/?c=2")
    console.log("openSeaData.data", nftData.data.items)
    setNftOwner(nftData.data.items)
  }
  const fetchSales = async () => {
    const sales = await axios.get("https://api.nftinit.io/api/sale_chart/?slug=boredapeyachtclub&tc=true&tn=true")
    console.log("openSeaData.data", sales.data.items)
    let filter = sales.data.items?.filter(item => item.event_price < 10000)
    setSalesData(filter)
  }
  
  return (
    <div>
      <div>
        <Tabs>
          <TabList>
            <Tab>Floor Price</Tab>
            <Tab onClick={fetchStrength}>Floor Strength</Tab>
            <Tab onClick={fetchListing}>Active Listings</Tab>
            <Tab onClick={fetchOwner}>Nfts Per Owner</Tab>
            <Tab onClick={fetchSales}>Sales / Ranking</Tab>
          </TabList>
          <TabPanel>
              <AreaChart
                width={1000}
                height={800}
                data={collection}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false}/>
                <XAxis dataKey="timestamp" />
                <YAxis />
                <Tooltip />
                <Area type="linear" dataKey="floor_price" stroke="#8884d8" fill="#8884d8" />
              </AreaChart>
          </TabPanel>
          <TabPanel>
            <BarChart
              width={1000}
              height={800}
              data={strength}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="price_range" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </TabPanel>
          <TabPanel>
            <AreaChart
              width={1000}
              height={800}
              data={listing}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false}/>
              <XAxis dataKey="timestamp" />
              <YAxis />
              <Tooltip />
              <Area type="linear" dataKey="listed_count" stroke="#8884d8" fill="#8884d8" />
            </AreaChart>
          </TabPanel>
          <TabPanel>
            <BarChart
              width={1000}
              height={800}
              data={nftOwner}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="nft" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="percantage" fill="#8884d8" />
            </BarChart>
          </TabPanel>
          <TabPanel>
            <ScatterChart
              width={1000}
              height={800}
              margin={{
                top: 20,
                right: 20,
                bottom: 20,
                left: 20,
              }}
            >
              <CartesianGrid />
              <XAxis dataKey="event_date" name="stature" unit="cm" />
              <YAxis dataKey="event_price" name="weight" unit="kg" />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Scatter name="A school" data={salesData} fill="#8884d8" />
            </ScatterChart>
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
};

export default Analysis;