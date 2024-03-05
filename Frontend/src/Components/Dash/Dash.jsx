import React, { useState, useEffect } from 'react';
import './Dash.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavLinks from '../NavLinks/NavLinks.jsx';
import Home from '../Home/Home.jsx';
import Accounts from '../Accounts/Accounts.jsx';

const Dash = () => {
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className="container-fluid">
            <div className="row">
                {!isSmallScreen && (
                    <div className="col-lg-1 col-md-1 col-sm-1 navlink-main" style={{ margin: '0', padding: '0', width: '6%' }}>
                        <NavLinks />
                    </div>
                )}
                <div className={`col-lg-${isSmallScreen ? '12' : '7'} col-md-7 col-sm-${isSmallScreen ? '12' : '11'} home-component`} style={{ width: isSmallScreen ? '100%' : '73%' }}>
                    <Home />
                </div>
                {!isSmallScreen && (
                    <div className="col-lg-4 col-md-4 col-sm-12 accounts-main" style={{ width: '21%', margin: '0', padding: '0' }}>
                        <Accounts />
                    </div>
                )}
            </div>
        </div>
    );
}

export default Dash;
