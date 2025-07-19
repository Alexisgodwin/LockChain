//TokenPage.js
//Updated to fetch candlestick data for top tokens.

import React, { useState, useEffect } from 'react';
import { CandlestickController, CandlestickElement, Chart as ChartJS } from 'chart.js';
import { Chart } from 'react-chartjs-2';

ChartJS.register(CandlestickController, CandlestickElement);

const TokenPage = () => {
  const [tokens, setTokens] = useState([]);

  useEffect(() => {
    const fetchTokens = async () => {
      try {
        const response = await fetch('https://api.shasta.trongrid.io/v1/assets', {
          headers: { 'TRON-PRO-API-KEY': process.env.REACT_APP_TRONGRID_API_KEY }
        });
        const data = await response.json();
        const topTokens = data.data.slice(0, 10).map(t => ({
          name: t.name,
          contract: t.id,
          open: t.price_usd || 0,
          high: t.price_usd * 1.1, // Simulated for demo
          low: t.price_usd * 0.9,
          close: t.price_usd,
          timestamp: new Date().toISOString(),
        }));
        setTokens(topTokens);
      } catch (error) {
        console.error('Error fetching tokens:', error);
      }
    };
    fetchTokens();
  }, []);

  return (
    <div className="p-4">
      <h2>Top 10 Tokens (24h)</h2>
      {tokens.map(token => (
        <div key={token.contract}>
          <h3>{token.name}</h3>
          <Chart
            type="candlestick"
            data={{
              datasets: [{
                label: token.name,
                data: [{
                  x: new Date(token.timestamp).getTime(),
                  o: token.open,
                  h: token.high,
                  l: token.low,
                  c: token.close,
                }],
              }],
            }}
          />
        </div>
      ))}
    </div>
  );
};

export { TokenPage };