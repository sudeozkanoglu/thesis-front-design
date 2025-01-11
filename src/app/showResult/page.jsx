"use client"; 

import React from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import ExamResult from "@/components/ExamResult";
import Footer from "@/components/Footer";
import ShowResult from "@/components/ShowResult";

const Results = () => {
    const [activeLink, setActiveLink] = React.useState("Results");
    
    return (
        <div className="min-h-screen bg-slate-100">
            <Navbar />
            <div className="pt-24 px-4 flex gap-4">
            {/* Left Column */}
            <div className="w-64 flex flex-col gap-4">
                <Sidebar activeLink={activeLink} setActiveLink={setActiveLink} />
                <ExamResult />
            </div>
    
            {/* Right Column */}
            <div className="flex-1 bg-white rounded-lg shadow-md p-6">
                <ShowResult />
            </div>
            </div>
            <Footer />
        </div>
    );
};

export default Results;