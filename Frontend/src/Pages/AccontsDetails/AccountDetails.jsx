import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams to access route parameters
import { API_URLS } from '../../api.config';

const AccountDetails = () => {
  const { accountId } = useParams();
  const [accountDetails, setAccountDetails] = useState(null);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchAccountDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URLS}/api/accounts/${accountId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        if (response.ok) {
          const account = await response.json();
          setAccountDetails(account);
        } else {
          console.error('Failed to fetch account details:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching account details:', error);
      } finally {
        setLoading(false); 
      }
    };
    fetchAccountDetails();
  }, [accountId]); 

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!accountDetails) {
    return <div>Failed to fetch account details</div>; 
  }

  return (
    <div className="account-details">
      <h2>Account Details</h2>
      <div>
        <p>Bank Name: {accountDetails.bankName}</p>
        <p>Account Number: {accountDetails.accountNumber}</p>
        <p>Account Type: {accountDetails.accountType}</p>
      </div>
    </div>
  );
};

export default AccountDetails;
