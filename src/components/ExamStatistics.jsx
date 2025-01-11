"use client";

import React from 'react';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { Users, Trophy, BookOpen, Target } from 'lucide-react';
import Typography from "@mui/material/Typography";

export default function ExamStatistics() {
  // Mock data - replace with real data from your backend
  const examData = {
    totalStudents: 124,
    averageScore: 78.5,
    highestScore: 98,
    participationRate: 94,
    scoreDistribution: [
      { grade: '0-20', count: 2 },
      { grade: '21-40', count: 8 },
      { grade: '41-60', count: 25 },
      { grade: '61-80', count: 45 },
      { grade: '81-100', count: 44 }
    ]
  };

  const stats = [
    {
      title: "Total Students",
      value: examData.totalStudents,
      icon: Users,
      color: "text-blue-600"
    },
    {
      title: "Average Score",
      value: `${examData.averageScore}%`,
      icon: Target,
      color: "text-green-600"
    },
    {
      title: "Highest Score",
      value: `${examData.highestScore}`,
      icon: Trophy,
      color: "text-yellow-600"
    },
    {
      title: "Participation",
      value: `${examData.participationRate}%`,
      icon: BookOpen,
      color: "text-purple-600"
    }
  ];

  const COLORS = ['#4F46E5', '#10B981', '#F59E0B', '#EF4444', '#6366F1'];

  return (
    <Card className="w-full mt-4 shadow-md rounded-lg">
      <Typography variant="h6" className="p-4 font-semibold items-center">Latest Exam Statistics</Typography>
      <CardContent>
        <div className="flex flex-col gap-4 mb-6">
          {stats.map((stat, index) => (
            <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
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
          <Typography 
            variant="h6" 
            className="text-center font-bold mb-4"
          >
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
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
