import React from "react";
import { Link } from "react-router-dom";
import {
  IoHomeOutline,
  IoPersonOutline,
  IoDocumentTextOutline,
  IoSettingsOutline,
  IoExitOutline,
} from "react-icons/io5";
import "./NavLinks.css";

const NavLinks = () => {
  const logoutHandler = () => {
    localStorage.clear();
  };
  return (
    <div className="sidebar">
      <div className="nav-links">
        <ul className="list">
          <li>
            <Link to="/dashboard">
              <IoHomeOutline />
            </Link>
          </li>
          <li>
            <Link to="/accountdetails/:accountId">
              <IoPersonOutline />
            </Link>
          </li>
          <li>
            <Link to="/detailhistory">
              <IoDocumentTextOutline />
            </Link>
          </li>
          <li>
            <Link to="/setting">
              <IoSettingsOutline />
            </Link>
          </li>
        </ul>
      </div>
      <div className="exit">
        <Link to="/logout" onClick={logoutHandler}>
          <IoExitOutline />
        </Link>
      </div>
    </div>
  );
};

export default NavLinks;
