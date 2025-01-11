"use client";

import React, { useState } from "react";

import { Card, CardContent } from "@mui/material";
import Footer from "../Footer";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";
import ExamResult from "../ExamResult";
import { useRouter } from "next/navigation";

const ExamLayout = () => {
  const [activeLink, setActiveLink] = useState("Exams");

  const studentName = "Jennifer Melfi";

  const router = useRouter();

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("");
  };

  const exams = [
    {
      id: 1,
      name: "Technical English for Engineers",
      date: "2025-01-11",
      time: "15:55",
      isCompleted: false,
      type: "EN-TR",
      endTime: "15:58",
    },
    {
      id: 2,
      name: "Everyday English Conversation",
      date: "2025-02-10",
      time: "22:20",
      isCompleted: false,
      type: "EN-TR",
      endTime: "23:00",
    },
    {
      id: 3,
      name: "English for Digital Media",
      date: "2024-12-26",
      time: "19:20",
      isCompleted: true,
      type: "TR-EN",
      endTime: "19:40",
    },
  ];

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

            {/* Sağda Öğrenci Bilgisi */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold">
                {getInitials(studentName)}
              </div>
              <h2 className="text-lg font-semibold text-slate-800">
                {studentName}
              </h2>
            </div>
          </div>
          <div className="flex flex-col gap-6 p-6">
          {sortedExams.map((exam) => {
              const now = new Date();
              const examStartTime = new Date(`${exam.date}T${exam.time}`);
              const examEndTime = new Date(`${exam.date}T${exam.endTime}`);

              // Henüz başlamadı mı?
              const isBeforeExamStart = now < examStartTime;
              // Sınav bitti mi? (endTime geçmişse)
              const isAfterExamEnd = now > examEndTime;

              // Buton varsayılanları
              let buttonText = "Start Exam";
              let isButtonDisabled = false;
              let buttonClasses = "bg-blue-950 text-white hover:bg-blue-800 cursor-pointer";

              // Sınav tamamlanmış veya bitiş saati geçmişse => "Show Result" (aktif)
              if (exam.isCompleted || isAfterExamEnd) {
                buttonText = "Show Result";
                isButtonDisabled = false;
                buttonClasses = "bg-green-600 text-white hover:bg-green-700";
              }
              // Henüz başlamadıysa => "Start Exam" (pasif)
              else if (isBeforeExamStart) {
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
              // Aksi durumda (şu an sınav zamanındaysa) => "Start Exam" (aktif)

              return (
                <Card key={exam.id} className="shadow-md bg-gray-50">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center mb-2">
                      {/* Sınav Adı */}
                      <h3 className="font-semibold text-lg">{exam.name}</h3>
                      {/* Sınav Türü */}
                      <span
                        className={`px-2 py-1 rounded-md text-white text-sm font-semibold ${
                          exam.type.startsWith("TR-EN")
                            ? "bg-yellow-500"
                            : "bg-orange-500"
                        }`}
                      >
                        {exam.type.startsWith("TR-EN") ? "TR-EN" : "EN-TR"}
                      </span>
                    </div>
                    {/* Sınav Tarihi ve Saat Aralığı */}
                    <p className="text-gray-600 mb-4">
                      {exam.date} - {exam.time} to {exam.endTime}
                    </p>
                    {/* Buton */}
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
