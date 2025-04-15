"use client";
import React, { useState, useEffect } from "react";

import Footer from "../../components/Footer";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import ExamResult from "../../components/ExamResult";
import RegisterCourseModal from "../../components/RegisterCourseModal";

const DashboardLayout = () => {
  const [activeLink, setActiveLink] = useState("Profile");

  const [studentId, setStudentId] = useState(null);
  const [courses, setCourses] = useState([]);
  const [exams, setExams] = useState([]);
  const [examSubmissions, setExamSubmissions] = useState([]);
  const [loadingCourses, setLoadingCourses] = useState(true);
  const [errorCourses, setErrorCourses] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedStudentId = localStorage.getItem("userId");
      setStudentId(storedStudentId);
    }
  }, []);

  useEffect(() => {
    if (!studentId) return;

    const fetchCourses = async () => {
      try {
        const res = await fetch(
          `http://localhost:4000/api/students/${studentId}/courses`
        );
        if (!res.ok) throw new Error("Failed to fetch courses");
        const data = await res.json();
        setCourses(data.courses || []);
      } catch (err) {
        setErrorCourses(err.message);
      } finally {
        setLoadingCourses(false);
      }
    };

    fetchCourses();
  }, [studentId]);

  useEffect(() => {
    if (!studentId) return;

    const fetchExams = async () => {
      try {
        const res = await fetch(
          `http://localhost:4000/api/students/${studentId}/exams`
        );
        const data = await res.json();
        if (!res.ok) throw new Error("Failed to fetch exams");
        setExams(data.exams || []);
      } catch (err) {
        console.error("Error fetching exams:", err);
      }
    };

    fetchExams();
  }, [studentId]);

  useEffect(() => {
    if (!studentId) return;

    const fetchSubmissions = async () => {
      try {
        const res = await fetch(
          `http://localhost:4000/api/students/${studentId}/exam-submissions`
        );
        const data = await res.json();
        setExamSubmissions(data.submissions || []);
      } catch (err) {
        console.error("Error fetching exam submissions:", err);
      }
    };

    fetchSubmissions();
  }, [studentId]);

  const getScoreColor = (score) => {
    if (score > 85) return "text-green-600";
    if (score > 60) return "text-yellow-600";
    if (score > 45) return "text-orange-600";
    return "text-red-600";
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />

      <div className="pt-24 px-4 flex gap-4">
        <div className="w-64 flex flex-col gap-4">
          <Sidebar activeLink={activeLink} setActiveLink={setActiveLink} />
          <ExamResult />
        </div>

        <div className="flex-1 bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <p className="text-slate-600 font-semibold">
              2024-2025 Fall Semester
            </p>
          </div>
          {/* Courses and Exams */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
            {loadingCourses ? (
              <p className="text-slate-600 col-span-full">Loading courses...</p>
            ) : errorCourses ? (
              <p className="text-red-600 col-span-full">{errorCourses}</p>
            ) : courses.length === 0 ? (
              <div className="col-span-full bg-yellow-100 text-yellow-800 p-6 rounded-md shadow">
                <p className="text-center font-semibold">
                  You are not registered in any course.
                </p>
                <button
                  onClick={() => setShowModal(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                  Register Course
                </button>
              </div>
            ) : (
              courses.map((course) => {
                const courseSubmissions = examSubmissions.filter(
                  (submission) => submission.exam?.course?._id === course._id
                );

                return (
                  <div
                    key={course._id}
                    className="bg-white rounded-lg shadow-md p-4"
                  >
                    <h3 className="text-lg font-semibold text-slate-800 mb-4 border-b pb-2">
                      {course.courseName}
                    </h3>

                    {courseSubmissions.length === 0 ? (
                      <p className="text-sm text-gray-400 italic">
                        No exams for this course yet.
                      </p>
                    ) : (
                      <div className="space-y-3">
                        {courseSubmissions.map((submission) => (
                          <div
                            key={submission._id}
                            className="flex justify-between items-center"
                          >
                            <span className="text-slate-600">
                              {submission.exam.examName}
                            </span>
                            <span
                              className={`font-medium ${getScoreColor(
                                submission.score
                              )}`}
                            >
                              {submission.score}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
      <RegisterCourseModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        studentId={studentId}
        onRegisterSuccess={async () => {
          const res = await fetch(
            `http://localhost:4000/api/students/${studentId}/courses`
          );
          const data = await res.json();
          setCourses(data.courses || []);
        }}
      />
      <Footer />
    </div>
  );
};

export default DashboardLayout;
