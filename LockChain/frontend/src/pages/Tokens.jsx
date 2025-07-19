import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";

export default function Tokens() {
  const [tokens, setTokens] = useState([]);
  const [portfolio, setPortfolio] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("marketCap");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching token data
    setTimeout(() => {
      setTokens([
        { 
          id: 1, 
          name: "TRON", 
          symbol: "TRX", 
          price: 0.095, 
          change24h: 2.5, 
          marketCap: 8500000000,
          volume24h: 450000000,
          logo: "🚀"
        },
        { 
          id: 2, 
          name: "Tether USD", 
          symbol: "USDT", 
          price: 1.00, 
          change24h: 0.1, 
          marketCap: 95000000000,
          volume24h: 28000000000,
          logo: "💰"
        },
        { 
          id: 3, 
          name: "BitTorrent", 
          symbol: "BTT", 
          price: 0.0000012, 
          change24h: -1.8, 
          marketCap: 1200000000,
          volume24h: 85000000,
          logo: "🌟"
        },
        { 
          id: 4, 
          name: "SUN Token", 
          symbol: "SUN", 
          price: 0.0085, 
          change24h: 5.2, 
          marketCap: 85000000,
          volume24h: 12000000,
          logo: "☀️"
        },
      ]);
      
      setPortfolio([
        { tokenId: 1, amount: 1000, value: 95 },
        { tokenId: 2, amount: 500, value: 500 },
        { tokenId: 4, amount: 10000, value: 85 },
      ]);
      
      setLoading(false);
    }, 1000);
  }, []);

  const filteredTokens = tokens.filter(token =>
    token.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    token.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedTokens = [...filteredTokens].sort((a, b) => {
    switch (sortBy) {
      case "name": return a.name.localeCompare(b.name);
      case "price": return b.price - a.price;
      case "change24h": return b.change24h - a.change24h;
      case "marketCap": return b.marketCap - a.marketCap;
      default: return 0;
    }
  });

  const totalPortfolioValue = portfolio.reduce((sum, item) => sum + item.value, 0);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <h2 className="text-3xl font-bold text-gradient">Token Explorer</h2>
        <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-4 mt-4 md:mt-0">
          <input
            type="text"
            placeholder="Search tokens..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          >
            <option value="marketCap">Market Cap</option>
            <option value="name">Name</option>
            <option value="price">Price</option>
            <option value="change24h">24h Change</option>
          </select>
        </div>
      </div>

      {/* Portfolio Overview */}
      {portfolio.length > 0 && (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg card-3d glass-effect">
          <h3 className="text-xl font-semibold mb-4">My Portfolio</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Value</p>
              <p className="text-2xl font-bold text-gradient">${totalPortfolioValue.toFixed(2)}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">24h Change</p>
              <p className="text-xl font-bold text-green-600">+$12.50 (+1.8%)</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">Holdings</p>
              <p className="text-xl font-bold">{portfolio.length} Tokens</p>
            </div>
          </div>
          <div className="space-y-2">
            {portfolio.map((holding) => {
              const token = tokens.find(t => t.id === holding.tokenId);
              return token ? (
                <div key={holding.tokenId} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{token.logo}</span>
                    <div>
                      <p className="font-medium">{token.name}</p>
                      <p className="text-sm text-gray-500">{holding.amount.toLocaleString()} {token.symbol}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${holding.value.toFixed(2)}</p>
                    <p className="text-sm text-gray-500">${token.price.toFixed(6)}</p>
                  </div>
                </div>
              ) : null;
            })}
          </div>
        </div>
      )}

      {/* Token List */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg card-3d glass-effect overflow-hidden">
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-4">Market Overview</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Token</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">24h Change</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Market Cap</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Volume (24h)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {sortedTokens.map((token) => (
                <tr key={token.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{token.logo}</span>
                      <div>
                        <p className="font-medium">{token.name}</p>
                        <p className="text-sm text-gray-500">{token.symbol}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="font-medium">${token.price.toFixed(6)}</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      token.change24h >= 0 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                        : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                    }`}>
                      {token.change24h >= 0 ? '+' : ''}{token.change24h.toFixed(2)}%
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="font-medium">${(token.marketCap / 1000000).toFixed(0)}M</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="font-medium">${(token.volume24h / 1000000).toFixed(0)}M</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors">
                      Trade
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

