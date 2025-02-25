import React from "react";
import Login from "./component/Login";
import Dashboar from "./component/Dashboar";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCount,
} from "./store/features/CounterSlice";
import UserComp from "./component/users";
import AlertsComp from "./component/alerts/index";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserDetails from "./component/users/UserDetails";


const App = () => {
  const count = useSelector(selectCount);
  const dispatch = useDispatch();

  return (
    <>
      <Router>
        <ToastContainer />
        <Routes>
          <Route path="/Alerts" element={<AlertsComp />} />
          <Route path="/" element={<Login />} />
          <Route path="/User" element={<UserComp />} />
          <Route path="/Dashboard" element={<Dashboar />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
