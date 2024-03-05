import React from 'react';
import './History.css';

function History() {
  return (
    <div className="container history-container">
      <div className="row">
        <div className="col-md-11" style={{width:'100%'}}>
          <div className='flex flex-row items-center history-heading'>
            <h2 className="mr-auto m-3">History</h2>
            <button type="button" className="btn">
              <a href="/detailhistory">
                See all
              </a>
            </button>
          </div>


          <div className="card">
            <div className="card-body">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Date</th>
                    <th scope="col">Description</th>
                    <th scope="col">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>11-06-2022</td>
                    <td>Amazon Purchase</td>
                    <td>$115</td>
                  </tr>
                  <tr>
                    <td>10-06-2022</td>
                    <td>Netflix Premium</td>
                    <td>$15</td>
                  </tr>
                  <tr>
                    <td>05-06-2022</td>
                    <td>House Rent</td>
                    <td>$2000</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default History;
