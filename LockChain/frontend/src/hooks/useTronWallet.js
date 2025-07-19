
import React, { useState, useEffect } from "react";
import { useTronWallet } from "../hooks/useTronWallet";

export default function Wallet() {
  const { address, balance, connectWallet, disconnectWallet, sendTransaction } = useTronWallet();
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    if (address) {
      // Fetch transaction history
      setTransactions([
        { id: 1, type: 'sent', amount: 100, to: 'TRon...xyz123', date: '2024-01-15' },
        { id: 2, type: 'received', amount: 250, from: 'TRon...abc456', date: '2024-01-14' },
        { id: 3, type: 'sent', amount: 75, to: 'TRon...def789', date: '2024-01-13' },
      ]);
    }
  }, [address]);

  const handleSendTransaction = async (e) => {
    e.preventDefault();
    if (!recipient || !amount) return;
    
    setIsLoading(true);
    try {
      await sendTransaction(recipient, amount);
      setRecipient("");
      setAmount("");
      // Refresh balance and transactions
    } catch (error) {
      console.error("Transaction failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!address) {
    return (
      <div className="max-w-md mx-auto">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg card-3d glass-effect text-center">
          <div className="mb-6">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center animate-pulse3d">
              <span className="text-3xl">💳</span>
            </div>
            <h2 className="text-2xl font-bold mb-2">Connect Your Wallet</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Connect your TronLink wallet to start using the dashboard
            </p>
          </div>
          <button
            onClick={connectWallet}
            className="w-full gradient-bg text-white px-6 py-3 rounded-lg font-semibold hover:scale-105 transition-transform duration-300 shadow-lg"
          >
            Connect TronLink Wallet
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <h2 className="text-3xl font-bold text-gradient">My Wallet</h2>
        <button
          onClick={disconnectWallet}
          className="mt-4 md:mt-0 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
        >
          Disconnect
        </button>
      </div>

      {/* Wallet Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg card-3d glass-effect">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold">Account Balance</h3>
            <div className="text-green-500 animate-pulse">● Live</div>
          </div>
          
          <div className="text-center py-8">
            <div className="text-4xl font-bold text-gradient mb-2">
              {balance ? `${balance} TRX` : '0 TRX'}
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              ≈ ${balance ? (balance * 0.09).toFixed(2) : '0.00'} USD
            </p>
          </div>

          <div className="text-center text-sm text-gray-500 dark:text-gray-400 font-mono break-all">
            {address}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg card-3d glass-effect">
          <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full p-3 bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-800 transition-colors">
              📨 Send TRX
            </button>
            <button className="w-full p-3 bg-green-50 dark:bg-green-900 text-green-600 dark:text-green-400 rounded-lg hover:bg-green-100 dark:hover:bg-green-800 transition-colors">
              📥 Receive TRX
            </button>
            <button className="w-full p-3 bg-purple-50 dark:bg-purple-900 text-purple-600 dark:text-purple-400 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-800 transition-colors">
              🔄 Swap Tokens
            </button>
          </div>
        </div>
      </div>

      {/* Send Transaction Form */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg card-3d glass-effect">
        <h3 className="text-lg font-semibold mb-4">Send Transaction</h3>
        <form onSubmit={handleSendTransaction} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Recipient Address</label>
              <input
                type="text"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="TRon..."
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Amount (TRX)</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                step="0.000001"
                min="0"
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={isLoading || !recipient || !amount}
            className="w-full gradient-bg text-white px-6 py-3 rounded-lg font-semibold hover:scale-105 transition-transform duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Sending..." : "Send Transaction"}
          </button>
        </form>
      </div>

      {/* Transaction History */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg card-3d glass-effect">
        <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>
        <div className="space-y-3">
          {transactions.map((tx) => (
            <div key={tx.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  tx.type === 'sent' ? 'bg-red-100 dark:bg-red-900' : 'bg-green-100 dark:bg-green-900'
                }`}>
                  <span className={tx.type === 'sent' ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}>
                    {tx.type === 'sent' ? '📤' : '📥'}
                  </span>
                </div>
                <div>
                  <p className="font-medium capitalize">{tx.type}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {tx.type === 'sent' ? `To: ${tx.to}` : `From: ${tx.from}`}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-medium ${tx.type === 'sent' ? 'text-red-600' : 'text-green-600'}`}>
                  {tx.type === 'sent' ? '-' : '+'}{tx.amount} TRX
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{tx.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
