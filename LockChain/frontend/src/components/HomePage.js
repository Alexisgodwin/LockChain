//HomePage.js
//Updated to fetch real-time token price data and contract call stats from TronGrid API for charts.

import React, { useState, useEffect } from 'react';
import { Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, ArcElement } from 'chart.js';
import SearchBar from './SearchBar';
import TronWeb from 'tronweb';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement);

const HomePage = () => {
  const [stats, setStats] = useState({
    accounts: 0,
    transactions: 0,
    tvl: 0,
    tps: 0,
    nodes: 0,
    contracts: 0,
    tokens: 0,
    topTokens: [],
    topContracts: [],
  });
  const [priceData, setPriceData] = useState({ labels: [], datasets: [] });
  const [contractData, setContractData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    const tronWeb = new TronWeb({ fullHost: 'https://api.shasta.trongrid.io', apiKey: process.env.REACT_APP_TRONGRID_API_KEY });
    const fetchData = async () => {
      try {
        // Fetch token price data
        const tokenResponse = await fetch('https://api.shasta.trongrid.io/v1/assets', {
          headers: { 'TRON-PRO-API-KEY': process.env.REACT_APP_TRONGRID_API_KEY }
        });
        const tokenData = await tokenResponse.json();
        const topTokens = tokenData.data.slice(0, 10).map(t => ({
          name: t.name,
          price: t.price_usd || 0,
        }));

        // Fetch contract call stats
        const contractResponse = await fetch('http://localhost:8000/contracts', {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });
        const contractDataResponse = await contractResponse.json();

        setStats({
          ...stats,
          topTokens,
          topContracts: contractDataResponse.topContracts || [],
        });

        setPriceData({
          labels: topTokens.map(t => t.name),
          datasets: [{
            label: 'Price (USD)',
            data: topTokens.map(t => t.price),
            borderColor: 'rgba(75, 192, 192, 1)',
            fill: false,
          }],
        });

        setContractData({
          labels: contractDataResponse.topContracts?.map(c => c.name) || [],
          datasets: [{
            data: contractDataResponse.topContracts?.map(c => c.calls) || [],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
          }],
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    const ws = new WebSocket('ws://localhost:8000/ws');
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setStats(prev => ({ ...prev, ...data }));
    };
    return () => ws.close();
  }, []);

  return (
    <div className="p-4">
      <SearchBar />
      <div className="grid grid-cols-2 gap-4">
        <div>Activated Accounts: {stats.accounts}</div>
        <div>Total Transactions: {stats.transactions}</div>
        <div>Total Value Locked: ${stats.tvl}</div>
        <div>Transactions Per Second: {stats.tps}</div>
        <div>Total Nodes: {stats.nodes}</div>
        <div>Smart Contracts: {stats.contracts}</div>
        <div>Total Tokens: {stats.tokens}</div>
      </div>
      <div className="mt-4">
        <h2>Top Tokens by Price</h2>
        <Line data={priceData} />
        <h2>Top Contracts by Calls (24h)</h2>
        <Pie data={contractData} />
      </div>
    </div>
  );
};

export { HomePage };