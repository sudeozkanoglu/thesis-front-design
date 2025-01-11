"use client";
import React, { useState } from "react";

import Footer from "../../components/Footer";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import ExamResult from "../../components/ExamResult";

const DashboardLayout = () => {
  const [activeLink, setActiveLink] = useState("Profile");

  const studentName = "Jennifer Melfi";

  const courses = [
    {
      title: "Everyday English Conversation",
      exams: [
        { name: "Speaking Assestment A", score: 85 },
        { name: "Speaking Assestment B", score: 92 },
        { name: "Speaking Assestment C", score: "" },
        { name: "Speaking Assessment D", score: "" },
        { name: "Midterm Exam", score: 95 },
        { name: "Final Exam", score: "" },
      ],
    },
    {
      title: "English for Digital Media",
      exams: [
        { name: "Speaking Assestment A", score: 82 },
        { name: "Speaking Assestment B", score: "" },
        { name: "Speaking Assestment C", score: "" },
        { name: "Speaking Assestment D", score: "" },
        { name: "Midterm Exam", score: 84 },
        { name: "Final Exam", score: "" },
      ],
    },
    {
      title: "Technical English for Engineers",
      exams: [
        { name: "Speaking Assestment A", score: 86 },
        { name: "Speaking Assestment B", score: 78 },
        { name: "Speaking Assestment C", score: "" },
        { name: "Speaking Assestment D", score: "" },
        { name: "Midterm Test", score: 90 },
        { name: "Final Exam", score: "" },
      ],
    },
    {
      title: "English for Tourism and Hospitality",
      exams: [
        { name: "Speaking Assestment A", score: 78 },
        { name: "Speaking Assestment B", score: 85 },
        { name: "Speaking Assestment C", score: 80 },
        { name: "Speaking Assessment D", score: 82 },
        { name: "Midterm Exam", score: 40 },
        { name: "Final Exam", score: "" },
      ],
    },
    {
      title: "English for Literature",
      exams: [
        { name: "Speaking Assestment A", score: 78 },
        { name: "Speaking Assestment B", score: "" },
        { name: "Speaking Assestment C", score: 80 },
        { name: "Speaking Assessment D", score: 75 },
        { name: "Midterm Exam", score: 88 },
        { name: "Final Exam", score: "" },
      ],
    },
    {
      title: "Medical English",
      exams: [
        { name: "Speaking Assestment A", score: 90 },
        { name: "Speaking Assestment B", score: 85 },
        { name: "Speaking Assestment C", score: 56 },
        { name: "Speaking Assessment D", score: "" },
        { name: "Midterm Exam", score: 88 },
        { name: "Final Exam", score: "" },
      ],
    },
    {
      title: "Business English",
      exams: [
        { name: "Speaking Assestment A", score: 78 },
        { name: "Speaking Assestment B", score: 85 },
        { name: "Speaking Assestment C", score: 67 },
        { name: "Speaking Assessment D", score: 82 },
        { name: "Midterm Exam", score: 99 },
        { name: "Final Exam", score: "" },
      ],
    },
  ];

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("");
  };

  const getScoreColor = (score) => {
    if (score > 85) return "text-green-600";
    if (score > 60) return "text-yellow-600";
    if (score > 45) return "text-orange-600";
    return "text-red-600";
  };

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Navbar */}
      <Navbar />

      <div className="pt-24 px-4 flex gap-4">
        {/* Left Column */}
        <div className="w-64 flex flex-col gap-4">
          {/* Sidebar */}
          <Sidebar activeLink={activeLink} setActiveLink={setActiveLink} />

          {/* Exam Results */}
          <ExamResult />
        </div>

        {/* Profile Section */}
        <div className="flex-1 bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold">
                {getInitials(studentName)}
              </div>
              <div>
                <h2 className="text-lg font-semibold text-slate-800">
                  {studentName}
                </h2>
                <p className="text-slate-600">Language Learner</p>
              </div>
            </div>
            {/* Sağ kısım: Eğitim-Öğretim Dönemi */}
            <div>
              <p className="text-slate-600 font-semibold">2024-2025 Fall Semester</p>
            </div>
          </div>
          {/* Courses Results */}
          <div className="grid grid-cols-4 gap-4 p-4">
            {courses.map((course) => (
              <div
                key={course.title}
                className="bg-white rounded-lg shadow-md p-4"
              >
                <h3 className="text-lg font-semibold text-slate-800 mb-4 border-b pb-2">
                  {course.title}
                </h3>
                <div className="space-y-3">
                  {course.exams.map((exam) => (
                    <div
                      key={exam.name}
                      className="flex justify-between items-center"
                    >
                      <span className="text-slate-600">{exam.name}</span>
                      <span className = {` font-medium text-blue-600 ${getScoreColor(
                        exam.score
                      )}`}>
                        {exam.score}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DashboardLayout;
