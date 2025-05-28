"use client";

import React, { useEffect, useState } from "react";
import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import ExamStatistics from "@/components/ExamStatistics";
import TeacherProfileInterface from "@/components/TeacherProfileInterface";

const TeacherProfile = () => {
  const [activeLink, setActiveLink] = useState("Profile");
  const [userId, setUserId] = useState(null);
  const [latestExamId, setLatestExamId] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUserId = localStorage.getItem("userId");
      setUserId(storedUserId);
    }
  }, []);

  useEffect(() => {
      const fetchLatestCompletedExam = async () => {
        if (!userId) return;
  
        try {
          const res = await fetch(
            `http://localhost:4000/api/exams/${userId}/latest-completed-exam`
          );
          const data = await res.json();
  
          if (data.success && data.exam) {
            setLatestExamId(data.exam._id);
          }
        } catch (err) {
          console.error("Error fetching latest completed exam:", err);
        }
      };
  
      fetchLatestCompletedExam();
    }, [userId]);
  
  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />
      <div className="pt-24 px-4 flex gap-4">
        <div className="w-64 flex flex-col gap-4">
          <Sidebar activeLink={activeLink} setActiveLink={setActiveLink} />
          {latestExamId && <ExamStatistics examId={latestExamId} />}
        </div>

        <div className="flex-1 bg-white rounded-lg shadow-md p-6">
          <TeacherProfileInterface userId={userId} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TeacherProfile;
