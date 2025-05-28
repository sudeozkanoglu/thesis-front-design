"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@mui/material";
import Footer from "../../../components/Footer";
import Sidebar from "../../../components/Sidebar";
import Navbar from "../../../components/Navbar";
import ExamResult from "../../../components/ExamResult";
import { useRouter } from "next/navigation";

const ExamLayout = () => {
  const router = useRouter();
  const [activeLink, setActiveLink] = useState("Exams");
  const [studentId, setStudentId] = useState(null);
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedId = localStorage.getItem("userId");
      setStudentId(storedId);
    }
  }, []);

  useEffect(() => {
    if (!studentId) return;

    const fetchExams = async () => {
      try {
        const res = await fetch(
          `http://localhost:4000/api/students/${studentId}/exams`
        );
        const data = await res.json();
        setExams(data.exams || []);
      } catch (err) {
        console.error("Failed to fetch exams:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchExams();
  }, [studentId]);

  useEffect(() => {
    if (!studentId) return;

    const fetchExamsAndSubmissions = async () => {
      try {
        const res = await fetch(
          `http://localhost:4000/api/students/${studentId}/exams`
        );
        const data = await res.json();

        const examsFromServer = data.exams || [];

        const subRes = await fetch(
          `http://localhost:4000/api/exam-submissions/${studentId}`
        );
        const subData = await subRes.json();

        const submittedExamIds = subData.success
          ? subData.submissions
              .filter((s) => s.status === "completed" && s.exam)
              .map((s) =>
                typeof s.exam === "object"
                  ? s.exam._id?.toString()
                  : s.exam?.toString()
              )
              .filter(Boolean)
          : [];

        const updatedExams = examsFromServer.map((exam) => ({
          ...exam,
          isSubmitted: submittedExamIds.includes(exam._id.toString()),
        }));

        setExams(updatedExams);
      } catch (err) {
        console.error("Error fetching exams or submissions:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchExamsAndSubmissions();
  }, [studentId]);

  useEffect(() => {
    if (!studentId || exams.length === 0) return;

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    exams.forEach((exam) => {
      const examDate = new Date(exam.examDate);
      const examDay = new Date(
        examDate.getFullYear(),
        examDate.getMonth(),
        examDate.getDate()
      );

      const isExpired = examDay < today;

      if (isExpired && !exam.isSubmitted) {
        fetch("http://localhost:4000/api/exam-submissions/autocomplete", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ studentId, examId: exam._id }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.success) {
              console.log(" Auto-completed:", exam.examName);
            }
          })
          .catch((err) => console.error("Auto-complete error:", err));
      }
    });
  }, [exams, studentId]);

  const sortedExams = [...exams].sort((a, b) => {
    const now = new Date();
    const aStart = new Date(`${a.date}T${a.time}`);
    const bStart = new Date(`${b.date}T${b.time}`);

    const aNotStarted = aStart > now; 
    const bNotStarted = bStart > now; 

    if (aNotStarted && !bNotStarted) return -1;
    if (!aNotStarted && bNotStarted) return 1;

    return aStart - bStart;
  });

  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />
      <div className="pt-24 px-4 flex gap-4">
        <div className="w-64 flex flex-col gap-4">
          <Sidebar activeLink={activeLink} setActiveLink={setActiveLink} />
          <ExamResult student={studentId} />
        </div>
        <div className="bg-white flex-1 p-8">
          <div className="flex justify-between items-center p-6">
            <h1 className="text-2xl font-bold text-slate-800 flex-1">
              Upcoming Exams
            </h1>
          </div>
          <div className="flex flex-col gap-6 p-6">
            {sortedExams.map((exam) => {
              const examDate = new Date(exam.examDate);
              const isValidDate = exam.examDate && examDate.getTime() > 0;

              let buttonText = "Start Exam";
              let isButtonDisabled = false;
              let buttonClasses =
                "bg-blue-950 text-white hover:bg-blue-800 cursor-pointer";

              if (!isValidDate) {
                buttonText = "Start Exam";
                isButtonDisabled = true;
                buttonClasses = "bg-gray-400 text-gray-200 cursor-not-allowed";
              } else if (exam.isSubmitted) {
                buttonText = "Show Result";
                isButtonDisabled = false;
                buttonClasses = "bg-green-600 text-white hover:bg-green-700";
              } else if (examDate > new Date()) {
                buttonText = "Start Exam";
                isButtonDisabled = true;
                buttonClasses = "bg-gray-400 text-gray-200 cursor-not-allowed";
              } 

              const handleButtonClick = () => {
                if (buttonText === "Show Result") {
                  router.push(`/student/showResult/${exam._id}`);
                } else if (buttonText === "Start Exam" && !isButtonDisabled) {
                  router.push(`/student/examInterface/${exam._id}`);
                }
              };

              const capitalize = (text) =>
                text.charAt(0).toUpperCase() + text.slice(1);

              return (
                <Card key={exam._id} className="shadow-md bg-gray-50">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-semibold text-lg">{exam.examName}</h3>
                      <span
                        className={`px-2 py-1 rounded-md text-white text-sm font-semibold ${
                          exam.examType === "quiz"
                            ? "bg-indigo-500"
                            : exam.examType === "midterm"
                            ? "bg-orange-500"
                            : "bg-red-500"
                        }`}
                      >
                        {capitalize(exam.examType)}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-4">
                      {isValidDate
                        ? `Exam Date: ${examDate.toLocaleDateString()}`
                        : "Exam Date: Not set"}
                    </p>
                    <button
                      className={`w-full p-2 rounded-md font-semibold ${buttonClasses}`}
                      disabled={isButtonDisabled}
                      onClick={handleButtonClick}
                    >
                      {buttonText}
                    </button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ExamLayout;
