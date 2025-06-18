"use client";
import React, { useState, useEffect } from "react";
import { useParams, useSearchParams } from "next/navigation";
import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import QuestionBuilder from "@/components/QuestionBuilder";
import ExamStatistics from "@/components/ExamStatistics";

const CreateQuestions = () => {
  const searchParams = useSearchParams();
  const status = searchParams.get("status");
  const [isEditable, setIsEditable] = useState(true);
  const [activeLink, setActiveLink] = useState("Exam");
  const { examId } = useParams();

  const [userId, setUserId] = useState(null);
  const [latestExamId, setLatestExamId] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUserId = localStorage.getItem("userId");
      setUserId(storedUserId);
    }
  }, []);

  if (!examId) return <p className="text-center">Loading...</p>;

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

  useEffect(() => {
    if (status === "completed") {
      setIsEditable(false);
    }
  }, [status]);

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
          <QuestionBuilder examId={examId} isEditable={isEditable} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CreateQuestions;
