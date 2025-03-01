"use client";

import React, { useState } from 'react';
import { useParams } from "next/navigation";
import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import QuestionBuilder from '@/components/QuestionBuilder';
import ExamStatistics from "@/components/ExamStatistics";

const CreateQuestions = () => {
    const [activeLink, setActiveLink] = useState("Exam");
    const {examId} = useParams();

    if (!examId) return <p className="text-center">Loading...</p>;

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
          <QuestionBuilder examId={examId} />
        </div>
      </div>
      <Footer />
    </div>
    );
};

export default CreateQuestions;