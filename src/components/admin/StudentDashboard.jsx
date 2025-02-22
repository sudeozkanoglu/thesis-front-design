"use client";
import React, { useEffect, useState } from "react";
import AdminSidebar from "./AdminSidebar";
import StudentTable from "./StudentTable";
import { useRouter } from "next/navigation";

export default function StudentDashboard() {
  const [activeSection, setActiveSection] = useState("student-settings");
  const [students, setStudents] = useState([]);
  const router = useRouter();

  const getStudents = async () => {
    const response = await fetch("http://localhost:4000/api/students/");
    const data = await response.json();
    setStudents(data.students);
  };

  useEffect(() => {
    getStudents();
  }, []);

  return (
    <div className="flex h-screen">
      <AdminSidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      <div className="flex-1 p-6 bg-gray-100 overflow-y-auto">
        <div>
          <div className="flex justify-between items-center mb-4">
          </div>
          <StudentTable students={students} fetchStudents={getStudents} />
        </div>
      </div>
    </div>
  );
}
