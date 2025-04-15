"use client";

import React, { useEffect, useState } from "react";
import { AlertCircle } from "lucide-react";


const RegisterCourseModal = ({ isOpen, onClose, studentId, onRegisterSuccess }) => {
  const [availableCourses, setAvailableCourses] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [registering, setRegistering] = useState(false);
  const [status, setStatus] = useState("");


  useEffect(() => {
    if (!isOpen) return;

    const fetchAvailableCourses = async () => {
      try {
        const res = await fetch(`http://localhost:4000/api/courses`);
        const data = await res.json();
        setAvailableCourses(data.courses || []);
      } catch (err) {
        console.error("Error fetching available courses:", err);
      }
    };

    fetchAvailableCourses();
    setStatus("");
  }, [isOpen]);

  const handleRegister = async () => {
    try {
      setRegistering(true);
      const res = await fetch(`http://localhost:4000/api/students/${studentId}/enroll`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ courseId: selectedCourseId }),
      });

      if (!res.ok) throw new Error("Enrollment failed");

      setRegistering(false);
      setStatus("success");
      onClose();
      onRegisterSuccess?.(); // kursları güncellemek için callback
      setSelectedCourseId("");
    } catch (err) {
      console.error("Registration error:", err);
      setStatus("error");
      setRegistering(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-md relative">
        <h2 className="text-lg font-semibold text-slate-800 mb-4">Register to a Course</h2>

        {availableCourses.length === 0 ? (
          <p className="text-slate-500 text-sm mb-4">You are already enrolled in all available courses.</p>
        ) : (
          <>
            <select
              value={selectedCourseId}
              onChange={(e) => setSelectedCourseId(e.target.value)}
              className="w-full border border-gray-300 rounded p-2 mb-4"
            >
              <option value="">Select a course</option>
              {availableCourses.map((course) => (
                <option key={course._id} value={course._id}>
                  {course.courseName} ({course.courseCode})
                </option>
              ))}
            </select>
          </>
        )}

        {/* Başarı / Hata mesajı */}
        {status === "success" && (
          <p className="text-green-600 font-medium mb-2">Successfully registered! ✅</p>
        )}
        {status === "error" && (
          <p className="text-red-600 font-medium mb-2">Something went wrong. ❌</p>
        )}

        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-slate-700 rounded hover:bg-gray-400 transition"
          >
            Cancel
          </button>
          <button
            disabled={!selectedCourseId || registering || availableCourses.length === 0}
            onClick={handleRegister}
            className={`px-4 py-2 rounded transition ${
              !selectedCourseId || availableCourses.length === 0
                ? "bg-blue-300 text-white cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            {registering ? "Registering..." : "Confirm"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterCourseModal;