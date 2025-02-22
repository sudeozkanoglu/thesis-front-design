"use client";
import React, { useState, useEffect } from "react";
import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import ExamResult from "@/components/ExamResult";
import Calendar from "@/components/Calendar";

const DashboardLayout = () => {
  const [activeLink, setActiveLink] = useState("Dashboard");
  const [personDatas, setPersonDatas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUserId = localStorage.getItem("userId");
      setUserId(storedUserId);
    }
  }, []);

  const personData = async () => {
    if (!userId) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `http://localhost:4000/api/students/${userId}`
      );
      const data = await response.json();
      if (response.ok) {
        setPersonDatas(data.student);
      } else {
        throw new Error(data.message || "Failed to fetch student data.");
      }
    } catch (err) {
      console.error("Error fetching student data:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      personData();
    }
  }, [userId]);

  const calendarData = [
    {
      id: 1,
      subject: "Business English",
      date: 2,
      time: "10:00",
      endTime: "10:40",
      color: "bg-pink-100 text-pink-700",
      type: "EN-TR",
    },
    {
      id: 2,
      subject: "Medical English",
      date: 3,
      time: "14:00",
      endTime: "14:30",
      color: "bg-purple-100 text-purple-700",
      type: "EN-TR",
    },
    {
      id: 3,
      subject: "Technical English for Engineers",
      date: 11,
      time: "11:00",
      endTime: "12:00",
      color: "bg-blue-100 text-blue-700",
      type: "TR-EN",
    },
    {
      id: 4,
      subject: "English for Tourism and Hospitality",
      date: 12,
      time: "15:00",
      endTime: "16:30",
      color: "bg-green-100 text-green-700",
      type: "TR-EN",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />
      <div className="pt-24 px-4 flex gap-4">
        {/* Left Column */}
        <div className="w-64 flex flex-col gap-4">
          <Sidebar activeLink={activeLink} setActiveLink={setActiveLink} />
          {/* Exam Results */}
          <ExamResult />
        </div>

        {/* Right Column */}
        <div className="flex-1 bg-white rounded-lg shadow-md p-6">
          <Calendar calendarData={calendarData} personData={personDatas} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DashboardLayout;
