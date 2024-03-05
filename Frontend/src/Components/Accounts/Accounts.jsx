import React, { useState, useEffect } from "react";
import { LiaEdit } from "react-icons/lia";
import { CiBank } from "react-icons/ci";
import { VscDiffAdded } from "react-icons/vsc";
import { PiDotsThreeVerticalBold } from "react-icons/pi";
import Profile from "../../Assests/IMG_20230724_115007.jpg";
import "./Accounts.css";
import AddAccountPopup from "./AddAccountPopup";
import { API_URLS } from "../../api.config";

const Accounts = () => {
  const [bankAccounts, setBankAccounts] = useState([]);
  const [showAddAccountPopup, setShowAddAccountPopup] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const fetchBankAccounts = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URLS}/api/accounts`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const accounts = await response.json();
        setBankAccounts(accounts);
      } else {
        console.error("Failed to fetch bank accounts:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching bank accounts:", error);
    }
  };

  useEffect(() => {
    fetchBankAccounts();
  }, []);
  const handleAddAccount = async (newAccountData) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No JWT token found");
      }
      const response = await fetch(`${API_URLS}/api/accounts`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newAccountData),
      });
      if (!response.ok) {
        throw new Error("Failed to add account");
      }
      const data = await response.json();
      console.log("Account added successfully:", data);
      fetchBankAccounts();
    } catch (error) {
      console.error("Failed to add account:", error.message);
    }
  };

  const handleClose = () => {
    setShowPopup(false);
  };

  const handleTogglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <div className="row acc">
      <div className="img">
        <img className="profilee" src={Profile} alt="" />
        <h6 className="name">Zain Ali</h6>
        <a href="/" className="edit">
          <LiaEdit />
          Edit Profile
        </a>
      </div>
      <div className="bank">
        <div>
          <p>Bank Accounts</p>
        </div>
        <div className="bank-details">
          {bankAccounts.map((account, index) => (
            <div className="bank-series" key={index}>
              <div className="row">
                <div className="col-md-3 bank-icon">
                  <CiBank />
                </div>
                <div className="col-md-7">
                  <div
                    className="row"
                    style={{ display: "flex", flexDirection: "column" }}
                  >
                    <div className="col-md-11 bank-name">
                      {account.bankName}
                    </div>
                    <div className="col-md-11">{account.accountNumber}</div>
                    <div className="col-md-11">{account.accountType}</div>
                  </div>
                </div>
                <div className="col-md-2 edit-bank">
                  <a href="#">
                    <PiDotsThreeVerticalBold />
                  </a>
                </div>
              </div>
            </div>
          ))}
          <div className="bank-series">
            <div className="row">
              <div className="col-md-3 bank-icon">
                <VscDiffAdded />
              </div>
              <div className="col-md-7">
                <div className="row">
                  <a onClick={handleTogglePopup}>Add Account</a>
                  {showPopup && (
                    <AddAccountPopup
                      onAddAccount={handleAddAccount}
                      onClose={handleClose}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accounts;
