"use client";
import React, { useEffect, useState } from "react";
import AdminSidebar from "./AdminSidebar";
import TeacherTable from "./TeacherTable";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

export default function TeacherDashboard() {
  const [activeSection, setActiveSection] = useState("teacher-settings");
  const [teachers, setTeachers] = useState([]);
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState(""); // Arama için
  

  const handleAddTeacher = () => {
    router.push("/admin/createTeacher");
  };

  const getTeacherKnowledges = async () => {
    const response = await fetch("http://localhost:4000/api/teacher/");
    const data = await response.json();
    setTeachers(data.teachers);
  };

  useEffect(() => {
    getTeacherKnowledges();
  }, []);

  const filteredTeachers = teachers.filter((teacher) =>
    `${teacher.firstName} ${teacher.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-screen">
      <AdminSidebar activeSection={activeSection} setActiveSection={setActiveSection}/>

      <div className="flex-1 p-6 bg-gray-100 overflow-y-auto">
          <div>
            <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800 ml-5">Teachers</h1>
              <div className="flex gap-4">
              <div className="relative">
                  <Search
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                  <input
                    type="text"
                    placeholder="Search teachers..."
                    className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <button
                  onClick={handleAddTeacher}
                  className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800"
                >
                  Add New Teacher
                </button>
              </div>
            </div>
            <TeacherTable teachers={filteredTeachers} fetchTeachers={getTeacherKnowledges}/>
          </div>
        
      </div>
    </div>
  );
};