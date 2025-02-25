import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../firebaseConfig/firebase";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const options = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: { grid: { display: true, color: "#f3f4f6" } },
    y: { grid: { display: true, color: "#f3f4f6" } },
  },
  plugins: { legend: { display: false } },
};

const LineChart = () => {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userCollection = collection(db, "users");
        const q = query(userCollection);
        const querySnapshot = await getDocs(q);
        let userData = {};

        querySnapshot.forEach((doc) => {
          const user = doc.data();
          if (user.premiumDate && user.premiumDate.toDate) {
            const premiumDateDate = user.premiumDate.toDate();
            const month = premiumDateDate.toLocaleString("default", {
              month: "long",
            });

            userData[month] = (userData[month] || 0) + 1;
          }
        });

        setUserData(userData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data: ", error);
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  const data = {
    labels: Object.keys(userData),
    datasets: [
      {
        label: "User Count",
        backgroundColor: "#565756",
        hoverBackgroundColor: "#565756",
        borderColor: "#565756",
        hoverBorderColor: "#565756",
        data: Object.values(userData),
      },
    ],
  };

  return (
    <div className="w-full h-full flex items-center justify-center p-4">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="w-full h-[300px] lg:h-[300px] max-w-[900px] mb-10">
          <Bar key={JSON.stringify(userData)} data={data} options={options} />
        </div>
      )}
    </div>
  );
};

export default LineChart;
