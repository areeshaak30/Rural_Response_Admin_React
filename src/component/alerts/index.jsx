import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectActiveTab, setActiveTab } from "../../store/features/AlertsTabSlice";
import { setAlertType } from "../../store/features/ActiveInActiveAlerts";
import InformationalAlerts from "./InformationalAlerts";
import EmergencyAlerts from "./EmergencyAlerts";
import Sidebar from "../Sidebar";
import arrow from "../../assets/arrow.svg";

const AlertsComp = () => {
  const activeTab = useSelector(selectActiveTab);
  const dispatch = useDispatch();
  const alertType = useSelector((state) => state.alertType.type);

  return (
    <>
      <section className="">
        <div>
          <div>
            <div className="flex justify-between mt-3">
              <p className="w-[56%] text-[20px] text-center font-semibold">
                Alerts
              </p>
              <Link to="/User"><img
                src={arrow}
                alt="arrow"
                className="absolute pb-2 left-[16%] top-5"
              /></Link>

              <form
                action=""
                className="w-[73%] relative flex gap-4 text-end  justify-end mr-8"
              >
                <select
                  name=""
                  id=""
                  onChange={(e) => {
                    const value = e.target.value;
                    dispatch(setAlertType(value));
                    // console.log(value, "val");
                  }}
                >
                  <option value="0">Active </option>
                  <option value="1" onClick={() => {}}>
                    Deactivate
                  </option>
                </select>
              </form>
            </div>
            <div className="flex">
              <div className="w-[15%]">
                <Sidebar />
              </div>
              <div className="w-[85%] mt-2  bg-slate-50 min-h-screen px-8">
                <div className="  my-4 text-end  ">
                  <button
                    onClick={() => dispatch(setActiveTab(0))}
                    className={` w-[12%] font-semibold text-black text-[14px] p-[9px]
                     mr-3 ${
                       activeTab === 0
                         ? "bg-[#3B9F9A] text-white"
                         : "bg-white text-[black]"
                     }`}
                  >
                    Informational
                  </button>
                  <button
                    className={` w-[12%] font-semibold text-black text-[14px] p-[9px]
                       ${
                         activeTab === 1
                           ? "bg-[#3B9F9A] text-white"
                           : "bg-white text-[black]"
                       }`}
                    onClick={() => dispatch(setActiveTab(1))}
                  >
                    Emergency
                  </button>
                </div>
                {activeTab === 0 && (
                  <>
                    <InformationalAlerts
                      activeAlertTab={alertType}
                    />
                  </>
                )}
                {activeTab === 1 && (
                  <EmergencyAlerts
                    activeAlertTab={alertType}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AlertsComp;
