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
  const [calendarData, setCalendarData] = useState([]);

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

  useEffect(() => {
    if (!userId) return;
  
    const fetchCalendarData = async () => {
      try {
        const res = await fetch(`http://localhost:4000/api/students/${userId}/exams`);
        const data = await res.json();
  
        const mapped = (data.exams || []).map((exam) => {
          const start = new Date(exam.examDate);
          const end = new Date(start);
          end.setMinutes(start.getMinutes() + (exam.duration || 0));
        
          return {
            id: exam._id,
            subject: exam.examName,
            fullDate: start.toISOString(), // 🌟 EKLENEN ALAN
            time: start.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            endTime: end.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            color:
              exam.examType === "midterm"
                ? "bg-orange-100 text-orange-800"
                : exam.examType === "final"
                ? "bg-red-100 text-red-800"
                : "bg-green-100 text-green-800",
            type: exam.examType.toUpperCase(),
          };
        });
  
        setCalendarData(mapped);
      } catch (err) {
        console.error("Error fetching calendar exams:", err);
      }
    };
  
    fetchCalendarData();
  }, [userId]);

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
