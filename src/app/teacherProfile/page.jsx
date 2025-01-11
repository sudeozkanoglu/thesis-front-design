"use client";

import React, { useState } from "react";
import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import ExamStatistics from "@/components/ExamStatistics";
import TeacherProfileInterface from "@/components/TeacherProfileInterface";

const TeacherProfile = () => {
    const [activeLink, setActiveLink] = useState("Profile");

    return (
        <div className="min-h-screen bg-slate-100">
            <Navbar />
            <div className="pt-24 px-4 flex gap-4">
                <div className="w-64 flex flex-col gap-4">
                    <Sidebar  activeLink={activeLink} setActiveLink={setActiveLink}/>
                    <ExamStatistics />
                </div>

                <div className="flex-1 bg-white rounded-lg shadow-md p-6">
                    <TeacherProfileInterface />
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default TeacherProfile;