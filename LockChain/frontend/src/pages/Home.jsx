import React, { useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "../contexts/AuthContext";
import { useLiveUpdates } from "../hooks/useLiveUpdates";

export default function Home() {
  const { token } = useAuth();
  const [stats, setStats] = useState(null);
  const liveData = useLiveUpdates();

  useEffect(() => {
    if (!token) return;
    api.get("/stats/home", token)
      .then(setStats)
      .catch(console.error);
  }, [token]);

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Dashboard</h2>
      {!token && <p>Please log in to see stats.</p>}
      {token && !stats && <p>Loading stats...</p>}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
            <h3 className="font-semibold">Activated Accounts</h3>
            <p className="text-2xl">{stats.activatedAccounts}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
            <h3 className="font-semibold">Total Transactions</h3>
            <p className="text-2xl">{stats.totalTransactions}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
            <h3 className="font-semibold">TVL</h3>
            <p className="text-2xl">{stats.tvl}</p>
          </div>
          {/* Add more cards as needed */}
        </div>
      )}
      {liveData && (
        <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900 rounded shadow">
          <h3 className="font-semibold mb-2">Live Updates</h3>
          <p>Block Number: {liveData.blockNumber}</p>
          <p>Transactions: {liveData.txCount}</p>
          <p>Timestamp: {new Date(liveData.timestamp).toLocaleString()}</p>
        </div>
      )}
    </div>
  );
}
