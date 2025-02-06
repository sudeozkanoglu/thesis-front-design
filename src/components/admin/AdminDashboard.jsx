"use client";
import React, {useState} from "react";
import AdminSidebar from "./AdminSidebar";

const AdminDashboard = () => {
  const stats = {
    totalTeachers: 15,
    totalStudents: 120,
    totalCourses: 8,
  };

  const [activeSection, setActiveSection] = useState("dashboard");

  const recentActivities = [
    "Teacher John Doe added a new course: English 101",
    "Student Jane Smith registered for Spanish 202",
    "Admin approved 5 new student registrations",
    "Course Materials for Physics 301 updated",
  ];

  const teachers = [
    { name: "John Doe", email: "john@example.com", specialization: "English" },
    { name: "Jane Smith", email: "jane@example.com", specialization: "Math" },
    { name: "Michael Brown", email: "michael@example.com", specialization: "Physics" },
    { name: "Emily Davis", email: "emily@example.com", specialization: "History" },
    { name: "Daniel White", email: "daniel@example.com", specialization: "Computer Science" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <AdminSidebar activeSection={activeSection} setActiveSection={setActiveSection} />

      {/* Dashboard Content */}
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Admin Dashboard</h1>

        {/* Stat Cards */}
        <div className="grid grid-cols-3 gap-6 mb-6">
          {[
            { title: "Total Teachers", value: stats.totalTeachers, color: "bg-blue-500" },
            { title: "Total Students", value: stats.totalStudents, color: "bg-green-500" },
            { title: "Total Courses", value: stats.totalCourses, color: "bg-yellow-500" },
          ].map(({ title, value, color }) => (
            <div key={title} className={`p-6 shadow-md rounded-lg text-white ${color}`}>
              <h2 className="text-xl font-bold">{title}</h2>
              <p className="text-3xl font-semibold mt-2">{value}</p>
            </div>
          ))}
        </div>

        {/* Recent Activities & Teachers Table */}
        <div className="grid grid-cols-3 gap-6">
          {/* Recent Activities */}
          <div className="col-span-2 bg-white p-6 shadow-md rounded-lg">
            <h2 className="text-xl font-bold mb-4">Recent Activities</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              {recentActivities.map((activity, index) => (
                <li key={index}>{activity}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;