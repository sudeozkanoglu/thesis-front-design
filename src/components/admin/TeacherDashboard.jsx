"use client";
import React, { useEffect, useState } from "react";
import AdminSidebar from "./AdminSidebar";
import TeacherTable from "./TeacherTable";
import { useRouter } from "next/navigation";

export default function TeacherDashboard() {
  const [activeSection, setActiveSection] = useState("teacher-settings");
  const [teachers, setTeachers] = useState([]);
  const router = useRouter();

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

  return (
    <div className="flex h-screen">
      <AdminSidebar activeSection={activeSection} setActiveSection={setActiveSection}/>

      <div className="flex-1 p-6 bg-gray-100 overflow-y-auto">
          <div>
            <div className="flex justify-between items-center mb-4">
              <button
                onClick={handleAddTeacher}
                className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800"
              >
                Add New Teacher
              </button>
            </div>
            <TeacherTable teachers={teachers} fetchTeachers={getTeacherKnowledges}/>
          </div>
        
      </div>
    </div>
  );
};