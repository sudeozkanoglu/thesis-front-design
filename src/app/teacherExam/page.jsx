"use client";

import React, { useState, useEffect } from "react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import ExamStatistics from "@/components/ExamStatistics";
import TeacherExamDashboard from "@/components/TeacherExamDashboard";

const TeacherExamLayout = () => {
  const [activeLink, setActiveLink] = useState("Exams");
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") { 
      const storedUserId = localStorage.getItem("userId");
      setUserId(storedUserId);
    }
  }, []);

  return (
        <div className="min-h-screen bg-slate-100">
        <Navbar />
        <div className="pt-24 px-4 flex gap-4">
            {/* Left Column */}
            <div className="w-64 flex flex-col gap-4">
            <Sidebar activeLink={activeLink} setActiveLink={setActiveLink} />
            <ExamStatistics />
            </div>

            {/* Right Column */}
            <div className="flex-1 bg-white rounded-lg shadow-md p-6">
            {userId && <TeacherExamDashboard userId={userId} />}
            </div>
        </div>
        <Footer />
        </div>
  );
};

export default TeacherExamLayout;
