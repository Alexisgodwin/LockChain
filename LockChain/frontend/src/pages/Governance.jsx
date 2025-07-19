import React, { useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "../contexts/AuthContext";

export default function Governance() {
  const { token } = useAuth();
  const [govData, setGovData] = useState(null);

  useEffect(() => {
    if (!token) return;
    api.get("/governance", token)
      .then(setGovData)
      .catch(console.error);
  }, [token]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Governance</h2>
      {!token && <p>Please log in to see governance data.</p>}
      {token && !govData && <p>Loading governance data...</p>}
      {govData && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
            <h3 className="font-semibold">Most Staked Token</h3>
            <p>{govData.mostStakedToken}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
            <h3 className="font-semibold">Most Votes</h3>
            <p>{govData.mostVotes.toLocaleString()}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
            <h3 className="font-semibold">Your Votes</h3>
            <p>{govData.userVotes.toLocaleString()}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
            <h3 className="font-semibold">Claimable Rewards</h3>
            <p>{govData.claimableRewards.toLocaleString()}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
            <h3 className="font-semibold">Total Staked</h3>
            <p>{govData.totalStaked.toLocaleString()}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
            <h3 className="font-semibold">Staking Rate (%)</h3>
            <p>{govData.stakingRate.toFixed(2)}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
            <h3 className="font-semibold">Cumulative Rewards</h3>
            <p>{govData.cumulativeRewards.toLocaleString()}</p>
          </div>
        </div>
      )}
    </div>
  );
}
