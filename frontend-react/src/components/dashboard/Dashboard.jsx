import React, { useEffect } from "react";
import axios from "axios";
import axiosInstance from "../../axiosinstance";

const Dashboard = () => {

  console.log("🔥 Dashboard rendered");

  useEffect(() => {
    console.log("🔥 useEffect running");

    const fetchProtectedData = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        // console.log("TOKEN:", token);

        const response = await axiosInstance.get(
          "/protected-view/",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("SUCCESS:", response.data);
      } catch (error) {
        console.error("ERROR:", error.response?.data || error);
      }
    };

    fetchProtectedData();
  }, []);

  return <div className="text-light">Dashboard Page</div>;

};

export default Dashboard;
