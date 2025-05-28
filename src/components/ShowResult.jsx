"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, Button } from "@mui/material";
import CardHeader from "@mui/material/CardHeader";
import { Check, X, Clock, Brain, Target, Award, BookOpen } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/navigation";

const ShowResult = ({ examId, studentId }) => {
  const router = useRouter();
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);
  const [subjectPerformance, setSubjectPerformance] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resultRes = await fetch(
          `http://localhost:4000/api/exam-submissions/${studentId}/${examId}`
        );
        const resultData = await resultRes.json();

        const historyRes = await fetch(
          `http://localhost:4000/api/exam-submissions/${studentId}`
        );
        const historyData = await historyRes.json();

        if (resultData.success && historyData.success) {
          setResults(resultData.result);

          const pastPerformances = historyData.submissions
            .filter((sub) => sub.exam && sub.overall_score != null)
            .map((sub) => ({
              name: sub.exam.examName || "Unnamed",
              score: sub.overall_score || 0,
            }));

          if (
            !pastPerformances.find((p) => p.name === resultData.result.examName)
          ) {
            pastPerformances.push({
              name: resultData.result.examName,
              score: resultData.result.overall_score,
            });
          }

          setSubjectPerformance(pastPerformances);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    if (studentId && examId) {
      fetchData();
    }
  }, [studentId, examId]);

  if (loading) return <p className="p-6 text-gray-500">Loading...</p>;
  if (!results)
    return <p className="p-6 text-red-600">No result data found.</p>;

  const {
    examName,
    overall_score,
    totalQuestions,
    correctAnswers,
    questions = [],
  } = results;

  const pieData = [
    { name: "Correct", value: correctAnswers, color: "#22c55e" },
    {
      name: "Incorrect",
      value: totalQuestions - correctAnswers,
      color: "#ef4444",
    },
  ];

  const getScoreColor = (score) => {
    if (score > 85) return "#16a34a";
    if (score > 60) return "#ca8a04";
    if (score > 45) return "#f97316";
    return "#dc2626";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="pb-2 pt-4 px-6 flex items-center justify-between">
        <Button
          variant="outlined"
          color="secondary"
          startIcon={<ArrowBackIcon />}
          onClick={() => router.back()}
        >
          Back
        </Button>
      </div>
      <div className="grid grid-cols-2 gap-6 p-6">
        <div className="space-y-6">
          <Card className="shadow-lg">
            <CardHeader
              title="Exam Results"
              subheader={examName || "Exam"}
              avatar={<Award className="w-8 h-8 text-blue-500" />}
            />
            <CardContent>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex flex-col items-center p-4 bg-blue-50 rounded-xl">
                  <Target className="w-6 h-6 text-blue-500 mb-2" />
                  <span className="text-2xl font-bold text-gray-800">
                    {overall_score.toFixed(2)}
                  </span>
                  <span className="text-sm text-gray-500">Total Score</span>
                </div>
                <div className="flex flex-col items-center p-4 bg-green-50 rounded-xl">
                  <Brain className="w-6 h-6 text-green-500 mb-2" />
                  <span className="text-2xl font-bold text-gray-800">
                    {correctAnswers}/{totalQuestions}
                  </span>
                  <span className="text-sm text-gray-500">Correct</span>
                </div>
              </div>

              <div className="space-y-4">
                {questions.map((q, index) => (
                  <div
                    key={q._id || index}
                    className={`p-4 rounded-lg border-l-4 transition-all hover:shadow-md ${
                      q.isCorrect
                        ? "border-l-green-500 bg-green-50"
                        : "border-l-red-500 bg-red-50"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`p-2 rounded-full ${
                          q.isCorrect ? "bg-green-200" : "bg-red-200"
                        }`}
                      >
                        {q.isCorrect ? (
                          <Check className="w-4 h-4 text-green-700" />
                        ) : (
                          <X className="w-4 h-4 text-red-700" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-800">
                          {q.question}
                        </p>
                        <div className="mt-2 text-sm">
                          <p
                            className={
                              q.isCorrect ? "text-green-700" : "text-red-700"
                            }
                          >
                            Your answer: {q.studentAnswer}
                          </p>
                          {!q.isCorrect && (
                            <p className="text-green-700 mt-1">
                              Correct answer: {q.correctAnswer}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="shadow-lg">
            <CardHeader
              title="Analytics"
              subheader="Detailed Breakdown"
              avatar={<BookOpen className="w-8 h-8 text-blue-500" />}
            />
            <CardContent>
              <div className="bg-white p-4 rounded-xl mb-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-700">
                  Score Distribution
                </h3>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend align="center" verticalAlign="bottom" />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white p-4 rounded-xl">
                <h3 className="text-lg font-semibold mb-4 text-gray-700">
                  Performance by Subject
                </h3>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={subjectPerformance}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar
                      dataKey="score"
                      radius={[4, 4, 0, 0]}
                      isAnimationActive={false}
                    >
                      {subjectPerformance.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={getScoreColor(entry.score)}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ShowResult;
