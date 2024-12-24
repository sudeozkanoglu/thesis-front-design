"use client";

import React, { useState } from "react";
import {
  Bell,
  Home,
  BookOpen,
  Settings,
  HelpCircle,
  LogOut,
} from "lucide-react";

import { Card, CardContent } from "@mui/material";

const ExamLayout = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [activeLink, setActiveLink] = useState("Dashboard");

  const examResults = [
    {
      id: 1,
      exam: "Medical Translation",
      score: 95,
      date: "2024-12-20",
      time: "10:00 AM",
    },
    {
      id: 2,
      exam: "Technical Manual",
      score: 82,
      date: "2024-12-18",
      time: "2:00 PM",
    },
    {
      id: 3,
      exam: "Legal Documents",
      score: 55,
      date: "2024-12-15",
      time: "11:30 AM",
    },
    {
      id: 4,
      exam: "Literary Works",
      score: 40,
      date: "2024-12-10",
      time: "3:00 PM",
    },
    {
      id: 5,
      exam: "Business",
      score: 75,
      date: "2024-12-05",
      time: "1:00 PM",
    },
  ];

  const getScoreColor = (score) => {
    if (score > 85) return "text-green-600";
    if (score > 60) return "text-yellow-600";
    if (score > 45) return "text-orange-600";
    return "text-red-600";
  };

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "System Update",
      message: "New features will be available next week",
      color: "yellow",
    },
    {
      id: 2,
      title: "System Maintenance",
      message: "Scheduled maintenance on Dec 25",
      color: "blue",
    },
  ]);

  const handleRemoveNotification = (id) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id)
    );
  };

  const studentName = "Jennifer Melfi";

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("");
  };

  const exams = [
    {
      id: 1,
      name: "Legal Translation",
      date: "2024-12-24",
      time: "10:00",
      isCompleted: false,
      type: "EN-TR",
      duration: 120,
    },
    {
      id: 2,
      name: "Technical Manual",
      date: "2024-12-23",
      time: "22:20",
      isCompleted: false,
      type: "EN-TR",
      duration: 40,
    },
    {
      id: 3,
      name: "Business Documents",
      date: "2024-12-20",
      time: "15:00",
      isCompleted: true,
      type: "TR-EN",
      duration: 60,
    },
  ];

  const sortedExams = [...exams].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Navbar */}
      <nav className="fixed top-4 left-4 right-4 bg-white/80 backdrop-blur-sm rounded-lg shadow-md p-4 z-50">
        <div className="flex justify-between items-center">
          <div className="w-32"></div>
          <h1 className="text-2xl font-bold text-center text-blue-500">
            TriLingua
          </h1>
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 hover:bg-slate-100 rounded-full"
            >
              <Bell className="w-6 h-6 text-slate-600" />
            </button>
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-gray-50/70 backdrop-blur-lg rounded-lg shadow-lg p-4">
                {notifications.length === 0 ? (
                  <p className="text-sm text-gray-500 text-center">
                    No notifications available
                  </p>
                ) : (
                  notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`mb-4 p-3 bg-neutral-200/70 backdrop-blur-sm rounded-md relative shadow-lg`}
                    >
                      <button
                        onClick={() =>
                          handleRemoveNotification(notification.id)
                        }
                        className="absolute top-2 right-2 text-slate-500 hover:text-slate-700"
                      >
                        ×
                      </button>
                      <h3
                        className={`font-semibold text-${notification.color}-600`}
                      >
                        {notification.title}
                      </h3>
                      <p className={`text-sm text-${notification.color}-600`}>
                        {notification.message}
                      </p>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </nav>

      <div className="pt-24 px-4 flex gap-4">
        {/* Left Column */}
        <div className="w-64 flex flex-col gap-4">
          {/* Sidebar */}
          <div className="bg-white rounded-lg shadow-md p-4">
            <nav className="space-y-2">
              {[
                { icon: Home, text: "Dashboard" },
                { icon: BookOpen, text: "Exams" },
                { icon: Settings, text: "Settings" },
                { icon: HelpCircle, text: "Help" },
                { icon: LogOut, text: "Logout" },
              ].map(({ icon: Icon, text }) => (
                <a
                  key={text}
                  href="#"
                  onClick={() => setActiveLink(text)}
                  className={`flex items-center gap-3 px-4 py-2 rounded-md transition-colors ${
                    activeLink === text
                      ? "bg-blue-50 text-blue-600 font-semibold"
                      : "text-black hover:bg-slate-50 font-semibold"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{text}</span>
                </a>
              ))}
            </nav>
          </div>

          {/* Exam Results */}
          <div className="bg-white rounded-lg shadow-md p-4 text-black">
            <h3 className="text-lg font-semibold mb-4">
              Latest 5 Exam Results
            </h3>
            <div className="space-y-3">
              {examResults.map((result) => (
                <div
                  key={result.id}
                  className="flex justify-between items-center p-3 bg-slate-50 rounded-md"
                >
                  <div>
                    <h4 className="font-semibold text-gray-700">
                      {result.exam}
                    </h4>
                    <p className="text-sm font-semibold text-gray-500">
                      {result.date}
                    </p>
                  </div>
                  <span
                    className={`text-xl font-semibold ${getScoreColor(
                      result.score
                    )}`}
                  >
                    {result.score}
                  </span>
                </div>
              ))}
            </div>
          </div>
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
              const examStartTime = new Date(`${exam.date}T${exam.time}`);
              const examEndTime = new Date(
                examStartTime.getTime() + exam.duration * 60 * 1000
              ); // Bitiş saatini hesapla

              const currentTime = new Date();
              const isBeforeStartTime = currentTime < examStartTime;

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
                      {new Date(exam.date).toLocaleDateString()} -{" "}
                      {examStartTime.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false,
                      })}{" "}
                      to{" "}
                      {examEndTime.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false,
                      })}
                    </p>
                    {/* Buton */}
                    <button
                      className={`w-full p-2 rounded-md font-semibold ${
                        exam.isCompleted
                          ? "bg-green-600 text-white hover:bg-green-700"
                          : isBeforeStartTime
                          ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                          : "bg-blue-950 text-white hover:bg-blue-800"
                      }`}
                      disabled={isBeforeStartTime}
                    >
                      {exam.isCompleted ? "Show Result" : "Start Exam"}
                    </button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamLayout;
