"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Next.js yönlendirme

const AdminSidebar = ({activeSection, setActiveSection}) => {
  const router = useRouter();

  // Menü Öğeleri ve Yönlendirme URL'leri
  const menuItems = [
    { id: "dashboard", label: "Dashboard", path: "/admin" },
    { id: "teacher-settings", label: "Teacher Settings", path: "/admin/listTeacher" },
    { id: "student-settings", label: "Student Settings", path: "/admin/students" },
    { id: "course-settings", label: "Course Settings", path: "/admin/listCourse" },
    { id: "logout", label: "Logout", path: "/" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("userType");
    localStorage.removeItem("token");
    router.push("/login");
  };

  const handleNavigation = (id, path) => {
    setActiveSection(id); // Aktif bölümü güncelle
    router.push(path); // Sayfaya yönlendir
  };

  return (
    <div className="w-64 bg-white border-r shadow-lg text-black">
      <div className="p-5">
        <h2 className="text-xl font-bold mb-5">Admin Panel</h2>
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              if (item.id === "logout") {
                handleLogout();
              } else {
                handleNavigation(item.id, item.path);
              }}}
            className={`w-full text-left p-3 rounded transition duration-200 ${
              activeSection === item.id
                ? "bg-blue-500 text-white"
                : "hover:bg-gray-200"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AdminSidebar;