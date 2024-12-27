"use client";

import React, {useState} from "react";
import Footer from "../Footer";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import ExamStatistics from "../ExamStatistics";
import TeacherLessonView from "../TeacherLessonView";

const LessonView = () => {
    const [activeLink, setActiveLink] = useState("Exam");

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
          <TeacherLessonView />
        </div>
      </div>
      <Footer />
    </div>
    );
}

export default LessonView;

