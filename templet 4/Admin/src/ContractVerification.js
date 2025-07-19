// ContractVerification.js
// New component for contract verification upload.

import React, { useState } from 'react';

const ContractVerification = () => {
  const [contractAddress, setContractAddress] = useState('');
  const [file, setFile] = useState(null);

  const handleVerify = async () => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('contract_address', contractAddress);
    await fetch('http://localhost:8000/admin/verify-contract', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
      body: formData,
    });
    setContractAddress('');
    setFile(null);
  };

  return (
    <div className="mt-4">
      <h2>Verify Contract</h2>
      <input
        type="text"
        value={contractAddress}
        onChange={(e) => setContractAddress(e.target.value)}
        placeholder="Contract Address"
        className="p-2 border rounded"
      />
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        className="p-2 border rounded"
      />
      <button onClick={handleVerify} className="bg-blue-500 text-white p-2 rounded">
        Verify Contract
      </button>
    </div>
  );
};

export default ContractVerification;
