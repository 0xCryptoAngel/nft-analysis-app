import React, { useState, useEffect } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
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
    setCollection(openSeaData.data)
  }
  const fetchStrength = async ()=> {
    const strengthData = await axios.get("https://api.nftinit.io/api/get_price_distribution/?c=2")
    setStrength(strengthData.data.items)
  }
  const fetchListing = async () => {
    const listingData = await axios.get("https://api.nftinit.io/api/chart/?password=Gunah4423_&slug=boredapeyachtclub&type=listed_count")
    setListing(listingData.data)
  }
  const fetchOwner = async () => {
    const nftData = await axios.get("https://api.nftinit.io/api/get_nfts_per_owner/?c=2")
    setNftOwner(nftData.data.items)
  }
  const fetchSales = async () => {
    const sales = await axios.get("https://api.nftinit.io/api/sale_chart/?slug=boredapeyachtclub&tc=true&tn=true")
    let filter = sales.data.items?.filter(item => item.event_price < 600)
    setSalesData(filter)
  }
  
  return (
    <div className="p-8">
      <Tabs>
        <TabList>
          <Tab>Floor Price</Tab>
          <Tab onClick={fetchStrength}>Floor Strength</Tab>
          <Tab onClick={fetchListing}>Active Listings</Tab>
          <Tab onClick={fetchOwner}>Nfts Per Owner</Tab>
          <Tab onClick={fetchSales}>Sales / Ranking</Tab>
        </TabList>
        <TabPanel>
          <ResponsiveContainer width="100%" height={800}>
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
              <CartesianGrid strokeDasharray="4 4" vertical={false}/>
              <XAxis dataKey="timestamp" ticks={['Page A', 'Page C', 'Page G']}/>
              <YAxis />
              <Tooltip />
              <Area type="linear" dataKey="floor_price" stroke="#8884d8" fill="#8884d8" />
            </AreaChart>
          </ResponsiveContainer>
        </TabPanel>
        <TabPanel>
          <ResponsiveContainer width="100%" height={800}>
            <BarChart
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
              <CartesianGrid strokeDasharray="4 4" vertical={false}/>
              <XAxis dataKey="price_range" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </TabPanel>
        <TabPanel>
          <ResponsiveContainer width="100%" height={800}>
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
              <CartesianGrid strokeDasharray="3 3" vertical={false}/>
              <XAxis dataKey="timestamp" />
              <YAxis />
              <Tooltip />
              <Area type="linear" dataKey="listed_count" stroke="#8884d8" fill="#8884d8" />
            </AreaChart>
          </ResponsiveContainer>
        </TabPanel>
        <TabPanel>
          <ResponsiveContainer width="100%" height={800}>
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
              <CartesianGrid strokeDasharray="4 4" vertical={false}/>
              <XAxis dataKey="nft" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="percantage" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </TabPanel>
        <TabPanel>
          <ResponsiveContainer width="100%" height={800}>
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
              <CartesianGrid strokeDasharray="4 4" vertical={false}/>
              <XAxis dataKey="event_date" name="stature" unit="cm" />
              <YAxis dataKey="event_price" name="weight" unit="kg" />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Scatter name="A school" data={salesData} fill="#8884d8" />
            </ScatterChart>
          </ResponsiveContainer>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default Analysis;