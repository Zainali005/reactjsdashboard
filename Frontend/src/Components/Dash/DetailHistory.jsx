import React, { useState } from 'react';
import './DetailHIstory.css';
import ReactPaginate from 'react-paginate';

function DetailHistory() {
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 10;
    const data = [
        { date: '10-05-2022', description: 'Amazon Purchase', amount: '$115' },
        { date: '11-05-2022', description: 'Netflix Premium', amount: '$15' },
        { date: '18-05-2022', description: 'House Rent', amount: '$200' },
        { date: '06-06-2022', description: 'House Rent', amount: '$1000' },
        { date: '08-06-2022', description: 'Online Payment', amount: '$10' },
        { date: '11-06-2022', description: 'House Rent', amount: '$600' },
        { date: '30-06-2022', description: 'House Rent', amount: '$50' },
        { date: '20-07-2022', description: 'Online Transfer', amount: '$1500' },
        { date: '04-08-2022', description: 'Daraz Purchase', amount: '$900' },
        { date: '30-08-2022', description: 'Amazon Purchase', amount: '$50' },
        { date: '20-09-2022', description: 'House Rent', amount: '$159.1' },
        { date: '04-10-2022', description: 'House Rent', amount: '$701' },
         { date: '30-10-2022', description: 'Money Transfer', amount: '$79' },
        { date: '20-11-2022', description: 'House Rent', amount: '$1590' },
        { date: '04-12-2022', description: 'Netflix', amount: '$909' },
        { date: '08-06-2022', description: 'Online Payment', amount: '$10' },
        { date: '11-06-2022', description: 'House Rent', amount: '$600' },
        { date: '30-06-2022', description: 'House Rent', amount: '$50' },
        { date: '20-07-2022', description: 'Online Transfer', amount: '$1500' },
        { date: '04-08-2022', description: 'Daraz Purchase', amount: '$900' },
        { date: '30-08-2022', description: 'Amazon Purchase', amount: '$50' },
        { date: '20-09-2022', description: 'House Rent', amount: '$159.1' },
        { date: '04-10-2022', description: 'House Rent', amount: '$701' },
         { date: '30-10-2022', description: 'Money Transfer', amount: '$79' },

    ];

    const offset = currentPage * itemsPerPage;
    const currentPageData = data.slice(offset, offset + itemsPerPage);

    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
    };

    return (
        <div className="container detailhistory-container">
            <div className="row">
                <div className="col-md-11">
                    <div className='flex flex-row items-center history-heading'>
                        <h2 className="mr-auto">History Details</h2>
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
                                    {currentPageData.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.date}</td>
                                            <td>{item.description}</td>
                                            <td>{item.amount}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <ReactPaginate
                        pageCount={Math.ceil(data.length / itemsPerPage)}
                        pageRangeDisplayed={5}
                        marginPagesDisplayed={2}
                        onPageChange={handlePageChange}
                        containerClassName={'pagination'}
                        activeClassName={'active'}
                    />
                </div>
            </div>
        </div>
    );
}

export default DetailHistory;
