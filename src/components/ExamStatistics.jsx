"use client";

import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import { Box } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { Users, Trophy, BookOpen, Target } from "lucide-react";
import Typography from "@mui/material/Typography";

export default function ExamStatistics({ examId }) {
  const [examData, setExamData] = useState(null);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const res = await fetch(
          `http://localhost:4000/api/exams/${examId}/statistics`
        );
        const data = await res.json();
        if (data.success) {
          setExamData(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch statistics:", error);
      }
    };

    if (examId) {
      fetchStatistics();
    }
  }, [examId]);

  if (!examData) {
    return (
      <Box className="w-full mt-4 shadow-md rounded-lg p-6 bg-white text-center">
        <Typography variant="h6" className="text-gray-600">
          No exam statistics have been published yet.
        </Typography>
      </Box>
    );
  }

  const stats = [
    {
      title: "Total Students",
      value: examData.totalStudents,
      icon: Users,
      color: "text-blue-600",
    },
    {
      title: "Average Score",
      value: `${(examData.averageScore).toFixed(2)}%`,
      icon: Target,
      color: "text-green-600",
    },
    {
      title: "Highest Score",
      value: `${(examData.highestScore).toFixed(2)}`,
      icon: Trophy,
      color: "text-yellow-600",
    }
  ];

  const COLORS = ["#4F46E5", "#10B981", "#F59E0B", "#EF4444", "#6366F1"];

  return (
    <Card className="w-full mt-4 shadow-md rounded-lg">
      <Typography variant="h6" className="p-4 font-semibold items-center">
        Latest Exam Statistics
      </Typography>
      <CardContent>
        <div className="flex flex-col gap-4 mb-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
            >
              <div className={`p-2 rounded-lg ${stat.color} bg-opacity-10`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <div>
                <p className="text-sm text-gray-600">{stat.title}</p>
                <p className="text-lg font-semibold">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="h-64">
          <Typography variant="h6" className="text-center font-bold mb-4">
            Score Distribution
          </Typography>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={examData.scoreDistribution}
                dataKey="count"
                nameKey="grade"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#4F46E5"
                paddingAngle={5}
              >
                {examData.scoreDistribution.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
