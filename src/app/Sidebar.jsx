// Sidebar.jsx
"use client";
import React from "react";
import { Home, BookOpen, Settings, HelpCircle, LogOut } from "lucide-react";

const Sidebar = ({ activeLink, setActiveLink }) => {
  const links = [
    { icon: Home, text: "Dashboard"},
    { icon: BookOpen, text: "Exams" },
    { icon: Settings, text: "Profile" },
    { icon: HelpCircle, text: "Help" },
    { icon: LogOut, text: "Logout" },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-4 ">
      <nav className="space-y-2">
        {links.map(({ icon: Icon, text }) => (
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
  );
};

export default Sidebar;
