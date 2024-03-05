import React, { useState } from 'react';
import './AddAccountPopup.css';

const AddAccountPopup = ({ onAddAccount, onClose }) => {
  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountType, setAccountType] = useState('');

  const handleAddAccount = () => {
    onAddAccount({ bankName, accountNumber, accountType });
    setBankName('');
    setAccountNumber('');
    setAccountType('');
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <div className="add-account-popup">
      <div className="add-account-content">
        <h2>Add New Account</h2>
        <div className="input-group">
          <label htmlFor="bankName">Bank Name:</label>
          <input
            type="text"
            id="bankName"
            value={bankName}
            onChange={(e) => setBankName(e.target.value)}
            placeholder="Enter bank name"
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="accountNumber">Account Number:</label>
          <input
            type="text"
            id="accountNumber"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            placeholder="Enter account number"
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="accountType">Account Type:</label>
          <input
            type="text"
            id="accountType"
            value={accountType}
            onChange={(e) => setAccountType(e.target.value)}
            placeholder="Enter account type"
            required
          />
        </div>
        <div className="btns">
          <button onClick={handleAddAccount}>Add Account</button>
          <button onClick={handleClose} className='close'>Close</button>

        </div>
      </div>
    </div>
  );
};

export default AddAccountPopup;
