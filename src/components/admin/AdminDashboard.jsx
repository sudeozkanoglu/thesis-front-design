"use client";
import React, { useEffect, useState } from "react";
import AdminSidebar from "./AdminSidebar";
import AdminNotificationForm from "./NotificationForm";
import { Divider } from "@mui/material";

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [stats, setStats] = useState({
    totalTeachers: 0,
    totalStudents: 0,
    totalCourses: 0,
  });
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const [responseTeacher, responseStudent, responseCourse] =
        await Promise.all([
          fetch("http://localhost:4000/api/teacher"),
          fetch("http://localhost:4000/api/students"),
          fetch("http://localhost:4000/api/courses"),
        ]);

      if (!responseTeacher.ok || !responseStudent.ok || !responseCourse.ok) {
        throw new Error("One or more requests failed.");
      }

      const [dataTeacher, dataStudent, dataCourse] = await Promise.all([
        responseTeacher.json(),
        responseStudent.json(),
        responseCourse.json(),
      ]);

      if (dataTeacher.teachers && dataStudent.students && dataCourse.courses) {
        setStats({
          totalTeachers: dataTeacher.teachers.length,
          totalStudents: dataStudent.students.length,
          totalCourses: dataCourse.courses.length,
        });
      } else {
        console.warn("Data format unexpected:", {
          dataTeacher,
          dataStudent,
          dataCourse,
        });
      }
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <AdminSidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      {/* Dashboard Content */}
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          Admin Dashboard
        </h1>

        {/* Stat Cards */}
        <div className="grid grid-cols-3 gap-6 mb-6">
          {[
            {
              title: "Total Teachers",
              value: stats.totalTeachers,
              color: "bg-blue-500",
            },
            {
              title: "Total Students",
              value: stats.totalStudents,
              color: "bg-green-500",
            },
            {
              title: "Total Courses",
              value: stats.totalCourses,
              color: "bg-yellow-500",
            },
          ].map(({ title, value, color }) => (
            <div
              key={title}
              className={`p-6 shadow-md rounded-lg text-white ${color}`}
            >
              <h2 className="text-xl font-bold">{title}</h2>
              <p className="text-3xl font-semibold mt-2">{value}</p>
            </div>
          ))}
        </div>
        <Divider className="mt-10 mb-10" />
        <AdminNotificationForm />
      </div>
    </div>
  );
};

export default AdminDashboard;
