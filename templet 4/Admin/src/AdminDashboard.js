// AdminDashboard.js
// Updated to include contract verification and API usage.

import React, { useState, useEffect } from 'react';
import TokenBlacklist from './TokenBlacklist';
import FeatureToggles from './FeatureToggles';
import Logs from './Logs';
import ContractVerification from './ContractVerification';

const AdminDashboard = () => {
  const [apiUsage, setApiUsage] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/admin/api-usage', {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    })
      .then(res => res.json())
      .then(data => setApiUsage(data));
  }, []);

  return (
    <div className="p-4">
      <h1>Admin Dashboard</h1>
      <div>
        <h2>API Usage</h2>
        <ul>
          {apiUsage.map((usage, index) => (
            <li key={index}>{usage.endpoint}: {usage.count} calls</li>
          ))}
        </ul>
        <TokenBlacklist />
        <FeatureToggles />
        <Logs />
        <ContractVerification />
      </div>
    </div>
  );
};

export default AdminDashboard;