"use client";
import React, { useEffect, useState } from "react";
import AdminSidebar from "./AdminSidebar";
import StudentTable from "./StudentTable";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

export default function StudentDashboard() {
  const [activeSection, setActiveSection] = useState("student-settings");
  const [students, setStudents] = useState([]);
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState(""); // Arama için


  const getStudents = async () => {
    const response = await fetch("http://localhost:4000/api/students/");
    const data = await response.json();
    setStudents(data.students);
  };

  useEffect(() => {
    getStudents();
  }, []);

  const filteredStudents = students.filter((student) =>
    `${student.firstName} ${student.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-screen">
      <AdminSidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      <div className="flex-1 p-6 bg-gray-100 overflow-y-auto">
        <div>
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold text-gray-800 ml-5">Students</h1>
            <div className="flex gap-4">
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Search students..."
                  className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
          <StudentTable students={filteredStudents} fetchStudents={getStudents} />
        </div>
      </div>
    </div>
  );
}
