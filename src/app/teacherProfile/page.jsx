"use client";

import React, { useState } from "react";
import Footer from "@/app/Footer";
import Sidebar from "@/app/Sidebar";
import Navbar from "@/app/Navbar";
import ExamStatistics from "../ExamStatistics";

const TeacherProfile = () => {
    const [activeLink, setActiveLink] = useState("Profile");
    
    const teacherName = "Tony Soprano";

    const getInitials = (name) => {
        return name
      .split(" ")
      .map((n) => n[0])
      .join("");
    };

    return (
        <div className="min-h-screen bg-slate-100">
            <Navbar />
            <div className="pt-24 px-4 flex gap-4">
                <div className="w-64 flex flex-col gap-4">
                    <Sidebar  activeLink={activeLink} setActiveLink={setActiveLink}/>
                    <ExamStatistics />
                </div>

                <div className="flex-1 bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-blue-100 text-blue-700 flex items-center justify-center rounded-full text-xl font-bold">
                            {getInitials(teacherName)}
                        </div>
                        <div>
                            <h2 className="text-xl text-black font-semibold">{teacherName}</h2>
                            <p className="text-sm text-gray-600">English Teacher</p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default TeacherProfile;