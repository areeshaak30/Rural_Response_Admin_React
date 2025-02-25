import React, { useState } from "react";
import Sidebar from "../component/Sidebar";
import MapForUser from "./MapForUser";
import MapForAlerts from "./MapForAlerts";
import LineChart from "./LineCHart";

const Dashboard = () => {
  const [activeContent, setActiveContent] = useState("Information");

  return (
    <section className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <div className="w-[15%] lg:w-[250px] flex-shrink-0">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 px-4 lg:px-8 py-6 max-w-[1400px] mx-auto">
        <div className="text-center mb-6">
          <p className="text-[20px] font-semibold">Dashboard</p>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md h-[400px]">
            <h1 className="text-xl font-semibold">Users</h1>
            <div className="mt-4 h-full">
              <LineChart />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h1 className="text-xl font-semibold">Alerts</h1>
            <div className="mt-4">
              <MapForAlerts />
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
          <h1 className="font-semibold text-xl mb-3">Users</h1>
          <MapForUser />
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
