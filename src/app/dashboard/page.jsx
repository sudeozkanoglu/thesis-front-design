"use client";
import React, { useState } from "react";
import {
  Bell,
  Calendar,
  Home,
  BookOpen,
  Settings,
  HelpCircle,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const DashboardLayout = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [activeLink, setActiveLink] = useState("Dashboard");
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const studentName = "Jennifer Melfi";
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

  const calendarData = [
    {
      id: 1,
      subject: "Academic Papers",
      date: 2,
      time: "10:00",
      color: "bg-pink-100 text-pink-700",
    },
    {
      id: 2,
      subject: "Software UI",
      date: 3,
      time: "14:00",
      color: "bg-purple-100 text-purple-700",
    },
    {
      id: 3,
      subject: "News Articles",
      date: 11,
      time: "11:00",
      color: "bg-blue-100 text-blue-700",
    },
    {
      id: 4,
      subject: "Marketing",
      date: 12,
      time: "15:00",
      color: "bg-green-100 text-green-700",
    },
  ];

  const getScoreColor = (score) => {
    if (score > 85) return "text-green-600";
    if (score > 60) return "text-yellow-600";
    if (score > 45) return "text-orange-600";
    return "text-red-600";
  };

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("");
  };

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const changeMonth = (increment) => {
    setCurrentMonth((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + increment);
      return newDate;
    });
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

        {/* Calendar */}
        <div className="flex-1 bg-white rounded-lg shadow-md p-6">
          {/* Calendar Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold">
                {getInitials(studentName)}
              </div>
              <h2 className="text-lg font-semibold text-slate-800">
                {studentName}
              </h2>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => changeMonth(-1)}
                className="p-2 hover:bg-slate-100 text-black rounded-full"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <h3 className="text-lg font-semibold min-w-[120px] text-center text-black">
                {monthNames[currentMonth.getMonth()]}
              </h3>
              <button
                onClick={() => changeMonth(1)}
                className="p-2 hover:bg-slate-100 text-black rounded-full"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-5 gap-4">
            <div className="text-center font-semibold text-black">Mon</div>
            <div className="text-center font-semibold text-black">Tue</div>
            <div className="text-center font-semibold text-black">Wed</div>
            <div className="text-center font-semibold text-black">Thu</div>
            <div className="text-center font-semibold text-black">Fri</div>

            {[...Array(25)].map((_, index) => {
              const day = index + 2;
              const exam = calendarData.find((e) => e.date === day);

              return (
                <div key={index} className="h-24 border rounded-lg p-2">
                  <div className="text-sm text-black mb-1">{day}</div>
                  {exam && (
                    <div className={`p-2 rounded-md text-xs ${exam.color}`}>
                      <div className="font-semibold">{exam.subject}</div>
                      <div className="font-semibold">{exam.time}</div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
