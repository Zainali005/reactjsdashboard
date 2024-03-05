import React from 'react';
import './Balance.css';

const Balance = ({ data }) => {
  return (
    <div className="container">
      <div className="row">
        {data.map((item, index) => (
          <div className="col-md-3" key={index}>
            <div className="balance-item">
              <h6>{item.title}</h6>
              <div className="amount">{item.amount}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Balance;
