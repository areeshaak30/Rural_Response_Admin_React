import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../assets/Logo.svg";
import Dashboard from "../assets/Dashboard.svg";
import Logout from "../assets/Logout.svg";
import CONTACT from "../assets/CONTACT.svg";
const Sidebar = () => {
  const location = useLocation(); // Get current location
  const [activeLink, setActiveLink] = useState(location.pathname); // Set initial active link

  const handleClick = (path) => {
    setActiveLink(path);
  };

  return (
    <div>
      <nav>
        <div className="flex justify-center">
          <img src={Logo} alt="Logo" className="w-[40%] h-[100px]" />
        </div>
        <div className="list-none">
          <Link
            to="/Dashboard"
            className={
              activeLink === "/Dashboard" ? "list-style active" : "list-style"
            }
            onClick={() => handleClick("/Dashboard")}
          >
            <img src={Dashboard} alt="" /> <span>Dashboard</span>
          </Link>
          <div
            className={activeLink === "/User" ? "list-stylee active" : "null"}
            onClick={() => handleClick("/User")}
          >
            <Link
              to="/User"
              className={
                activeLink === "/User || /Alerts"
                  ? "list-style active"
                  : "list-style"
              }
              onClick={() => handleClick("/User")}
            >
              <img src={CONTACT} alt="User" /> <span>Users</span>
            </Link>
          </div>
          <Link
            to="/"
            className={activeLink === "/" ? "list-style active" : "list-style"}
            onClick={() => handleClick("/")}
          >
            <img src={Logout} alt="Logout" /> <span>Logout</span>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
