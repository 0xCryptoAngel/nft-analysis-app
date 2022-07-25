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
// const data = [
//   {
//     name: "Page A",
//     uv: 590,
//     pv: 800,
//     amt: 1400,
//     cnt: 490
//   },
//   {
//     name: "Page B",
//     uv: 868,
//     pv: 967,
//     amt: 1506,
//     cnt: 590
//   },
//   {
//     name: "Page C",
//     uv: 1397,
//     pv: 1098,
//     amt: 989,
//     cnt: 350
//   },
//   {
//     name: "Page D",
//     uv: 1480,
//     pv: 1200,
//     amt: 1228,
//     cnt: 480
//   },
//   {
//     name: "Page E",
//     uv: 1520,
//     pv: 1108,
//     amt: 1100,
//     cnt: 460
//   },
//   {
//     name: "Page F",
//     uv: 1400,
//     pv: 680,
//     amt: 1700,
//     cnt: 380
//   }
// ];

const data1 = [
  {
    name: "Page A",
    uv: 4000,
    amt: 2400
  },
  {
    name: "Page B",
    uv: 3000,
    amt: 2210
  },
  {
    name: "Page C",
    uv: 2000,
    amt: 2290
  },
  {
    name: "Page D",
    uv: 2780,
    amt: 2000
  },
  {
    name: "Page E",
    uv: 1890,
    amt: 2181
  },
  {
    name: "Page F",
    uv: 2390,
    amt: 2500
  },
  {
    name: "Page G",
    uv: 3490,
    amt: 2100
  }
];

// const data2 = [
//   {
//     name: "Page A",
//     uv: 4000,
//     pv: 2400,
//     amt: 2400
//   },
//   {
//     name: "Page B",
//     uv: 3000,
//     pv: 1398,
//     amt: 2210
//   },
//   {
//     name: "Page C",
//     uv: 2000,
//     pv: 9800,
//     amt: 2290
//   },
//   {
//     name: "Page D",
//     uv: 2780,
//     pv: 3908,
//     amt: 2000
//   },
//   {
//     name: "Page E",
//     uv: 1890,
//     pv: 4800,
//     amt: 2181
//   },
//   {
//     name: "Page F",
//     uv: 2390,
//     pv: 3800,
//     amt: 2500
//   },
//   {
//     name: "Page G",
//     uv: 3490,
//     pv: 4300,
//     amt: 2100
//   }
// ];

// const data3 = [
//   { x: 100, y: 200, z: 200 },
//   { x: 120, y: 100, z: 260 },
//   { x: 170, y: 300, z: 400 },
//   { x: 140, y: 250, z: 280 },
//   { x: 150, y: 400, z: 500 },
//   { x: 110, y: 280, z: 200 },
// ];
// const data4 = [
//   {
//     name: 'Page A',
//     uv: 4000,
//     pv: 2400,
//     amt: 2400,
//   },
//   {
//     name: 'Page B',
//     uv: 3000,
//     pv: 1398,
//     amt: 2210,
//   },
//   {
//     name: 'Page C',
//     uv: 2000,
//     pv: 9800,
//     amt: 2290,
//   },
//   {
//     name: 'Page D',
//     uv: 2780,
//     pv: 3908,
//     amt: 2000,
//   },
//   {
//     name: 'Page E',
//     uv: 1890,
//     pv: 4800,
//     amt: 2181,
//   },
//   {
//     name: 'Page F',
//     uv: 2390,
//     pv: 3800,
//     amt: 2500,
//   },
//   {
//     name: 'Page G',
//     uv: 3490,
//     pv: 4300,
//     amt: 2100,
//   },
// ];
const Analysis = () => {
  const [collection, setCollection] = useState([])
  useEffect(()=> {
    fetchCollection()
  }, [])
  const fetchCollection = async () => {
    const openSeaData = await axios.get("https://api.nftinit.io/api/chart/?password=Gunah4423_&slug=boredapeyachtclub&type=floor_price")
    console.log("openSeaData.data", openSeaData.data)
    setCollection(openSeaData.data)
  }
  return (
    <div>
      <div>
        <Tabs>
          <TabList>
            {/* <Tab>Floor Strength</Tab> */}
            <Tab>Floor Price</Tab>
            {/* <Tab>Active Listings</Tab>
            <Tab>Sales / Ranking</Tab>
            <Tab>Sales</Tab> */}
          </TabList>
          {/* <TabPanel>
            <ComposedChart
              width={500}
              height={400}
              data={data}
              margin={{
                top: 20,
                right: 20,
                bottom: 20,
                left: 20
              }}
            >
              <CartesianGrid stroke="#f5f5f5" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="amt" fill="#8884d8" stroke="#8884d8" />
              <Bar dataKey="pv" barSize={20} fill="#413ea0" />
              <Line type="monotone" dataKey="uv" stroke="#ff7300" />
              <Scatter dataKey="cnt" fill="red" />
            </ComposedChart>
          </TabPanel> */}
          <TabPanel>
            <ResponsiveContainer width="100%" height="100%">
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
              </ResponsiveContainer>
          </TabPanel>
          {/* <TabPanel>
            <BarChart
              width={500}
              height={300}
              data={data2}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="pv" fill="#8884d8" />
              <Bar dataKey="uv" fill="#82ca9d" />
            </BarChart>
          </TabPanel>
          <TabPanel>
            <ScatterChart
              width={400}
              height={400}
              margin={{
                top: 20,
                right: 20,
                bottom: 20,
                left: 20,
              }}
            >
              <CartesianGrid />
              <XAxis type="number" dataKey="x" name="stature" unit="cm" />
              <YAxis type="number" dataKey="y" name="weight" unit="kg" />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Scatter name="A school" data={data3} fill="#8884d8" />
            </ScatterChart>
          </TabPanel>
          <TabPanel>
            <AreaChart
              width={500}
              height={400}
              data={data4}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
            </AreaChart>
          </TabPanel> */}
        </Tabs>
      </div>
    </div>
  );
};

export default Analysis;