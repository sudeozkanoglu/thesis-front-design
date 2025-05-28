"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Footer from "../../../../components/Footer";
import Navbar from "../../../../components/Navbar";
import Sidebar from "../../../../components/Sidebar";
import ExamStatistics from "../../../../components/ExamStatistics";
import TeacherLessonView from "../../../../components/TeacherLessonView";

const LessonView = () => {
  const [activeLink, setActiveLink] = useState("Exam");
  const { courseId } = useParams();
  const [latestExamId, setLatestExamId] = useState(null);

  const [userId, setUserId] = useState(null);

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

  if (!courseId) return <p className="text-center">Loading...</p>;
  
  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />
      <div className="pt-24 px-4 flex gap-4">
        {/* Left Column */}
        <div className="w-64 flex flex-col gap-4">
          <Sidebar activeLink={activeLink} setActiveLink={setActiveLink} />
          {latestExamId && <ExamStatistics examId={latestExamId} />}
        </div>

        {/* Right Column */}
        <div className="flex-1 bg-white rounded-lg shadow-md p-6">
          <TeacherLessonView courseId={courseId} teacherId={userId}/>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LessonView;
