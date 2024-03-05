import React, { useState } from 'react';
import { CiSearch } from "react-icons/ci";
import { IoMenuOutline } from "react-icons/io5";
import './Home.css';
import NavLinks from '../NavLinks/NavLinks';
import Accounts from '../Accounts/Accounts';
import Balancee from '../Balance/Balancee';
import Charts from '../Charts/Charts';
import History from '../History/History';

const Home = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAccountsOpen, setIsAccountsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    setIsAccountsOpen(false);
  };

  const toggleAccounts = () => {
    setIsAccountsOpen(!isAccountsOpen);
    setIsSidebarOpen(false);
  };

  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <>
      <div className="container home-container" style={{ position: 'relative' }}>
        <nav className="navbar navbar-expand-md navbar-dark bg-transparent">
          <div className="container d-flex justify-content-between align-items-center">
            <div className="navbar-toggler" onClick={toggleSidebar}>
              <IoMenuOutline />
            </div>
            <h4 className="dash-title">Dashboard</h4>
            <div className="search-container">
              <CiSearch className={searchValue ? 'search-icon hidden' : 'search-icon'} />
              <input
                type="search"
                className='search'
                placeholder='Search'
                value={searchValue}
                onChange={handleInputChange}
              />
            </div>
            <div className="navbar-toggler" onClick={toggleAccounts}>
              <IoMenuOutline />
            </div>
          </div>
          <div className="content" style={{ zIndex: '10000', position: 'absolute', top: '5vh', height: 'fit-content' }}>
            {isSidebarOpen && <NavLinks />}
            {isAccountsOpen && <Accounts />}
          </div>


        </nav>
        <Balancee />
        <Charts/>
        <History/>
      </div>
    </>
  );
}

export default Home;
