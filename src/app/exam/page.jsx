"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@mui/material";
import Footer from "../../components/Footer";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import ExamResult from "../../components/ExamResult";
import { useRouter } from "next/navigation";

const ExamLayout = () => {
  const router = useRouter();
  const [activeLink, setActiveLink] = useState("Exams");
  const [studentId, setStudentId] = useState(null);
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedId = localStorage.getItem("userId");
      setStudentId(storedId);
    }
  }, []);

  useEffect(() => {
    if (!studentId) return;

    const fetchExams = async () => {
      try {
        const res = await fetch(
          `http://localhost:4000/api/students/${studentId}/exams`
        );
        const data = await res.json();
        setExams(data.exams || []);
      } catch (err) {
        console.error("Failed to fetch exams:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchExams();
  }, [studentId]);

  // Sıralama:
  // 1) Başlamamış (examStartTime > now) sınavlar yukarıda.
  // 2) Biten ya da başlayan (examStartTime <= now) sınavlar aşağıda.
  // İki grup da kendi içinde artan tarih sıralaması (en erken tarihten en geçe).
  const sortedExams = [...exams].sort((a, b) => {
    const now = new Date();
    const aStart = new Date(`${a.date}T${a.time}`);
    const bStart = new Date(`${b.date}T${b.time}`);

    const aNotStarted = aStart > now; // a henüz başlamamış mı?
    const bNotStarted = bStart > now; // b henüz başlamamış mı?

    // a başlamamış, b başlamış => a önce
    if (aNotStarted && !bNotStarted) return -1;
    // a başlamış, b başlamamış => b önce
    if (!aNotStarted && bNotStarted) return 1;

    // İkisi de aynı kategorideyse (ikisi de başlamamış veya ikisi de başlamış),
    // artan tarih sıralaması
    return aStart - bStart;
  });

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

        {/* Exams */}
        <div className="bg-white flex-1 p-8">
          <div className="flex justify-between items-center p-6">
            {/* Ortalanmış Başlık */}
            <h1 className="text-2xl font-bold text-slate-800 flex-1">
              Upcoming Exams
            </h1>
          </div>
          <div className="flex flex-col gap-6 p-6">
            {sortedExams.map((exam) => {
              const now = new Date();
              const examStartTime = new Date(exam.examDate);
              const examEndTime = new Date(exam.examDate);
              examEndTime.setMinutes(
                examEndTime.getMinutes() + (exam.duration || 0)
              );

              const isBeforeExamStart = now < examStartTime;
              const isAfterExamEnd = now > examEndTime;

              let buttonText = "Start Exam";
              let isButtonDisabled = false;
              let buttonClasses =
                "bg-blue-950 text-white hover:bg-blue-800 cursor-pointer";

              if (exam.status === "completed" || isAfterExamEnd) {
                buttonText = "Show Result";
                isButtonDisabled = false;
                buttonClasses = "bg-green-600 text-white hover:bg-green-700";
              } else if (isBeforeExamStart) {
                buttonText = "Start Exam";
                isButtonDisabled = true;
                buttonClasses = "bg-gray-400 text-gray-200 cursor-not-allowed";
              }

              const handleButtonClick = () => {
                if (buttonText === "Show Result") {
                  router.push("/showResult");
                } else if (buttonText === "Start Exam") {
                  router.push("/examInterface");
                }
              };

              const capitalize = (text) => text.charAt(0).toUpperCase() + text.slice(1);

              return (
                <Card key={exam._id} className="shadow-md bg-gray-50">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-semibold text-lg">{exam.examName}</h3>
                      <span
                        className={`px-2 py-1 rounded-md text-white text-sm font-semibold ${
                          exam.examType === "quiz"
                            ? "bg-indigo-500"
                            : exam.examType === "midterm"
                            ? "bg-orange-500"
                            : "bg-red-500"
                        }`}
                      >
                        {capitalize(exam.examType)}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-4">
                      {examStartTime.toLocaleDateString()} -{" "}
                      {examStartTime.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}{" "}
                      to{" "}
                      {examEndTime.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                    <button
                      className={`w-full p-2 rounded-md font-semibold ${buttonClasses}`}
                      disabled={isButtonDisabled}
                      onClick={handleButtonClick}
                    >
                      {buttonText}
                    </button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ExamLayout;
