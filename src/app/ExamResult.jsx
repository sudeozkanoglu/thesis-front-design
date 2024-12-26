"use client"; // Eğer Next.js 13 ve üstü kullanıyorsanız etkileşimli sayfa bileşenlerinde gereklidir

import React from "react";

const ExamResults = () => {
  const examResults = [
    {
      id: 1,
      exam: "Medical Translation",
      score: 95,
      date: "2024-12-20",
      time: "10:00 AM",
    },
    {
      id: 2,
      exam: "Technical Manual",
      score: 82,
      date: "2024-12-18",
      time: "2:00 PM",
    },
    {
      id: 3,
      exam: "Legal Documents",
      score: 55,
      date: "2024-12-15",
      time: "11:30 AM",
    },
    {
      id: 4,
      exam: "Literary Works",
      score: 40,
      date: "2024-12-10",
      time: "3:00 PM",
    },
    {
      id: 5,
      exam: "Business",
      score: 75,
      date: "2024-12-05",
      time: "1:00 PM",
    },
  ];

  const getScoreColor = (score) => {
    if (score > 85) return "text-green-600";
    if (score > 60) return "text-yellow-600";
    if (score > 45) return "text-orange-600";
    return "text-red-600";
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 text-black">
      <h3 className="text-lg font-semibold mb-4">Latest 5 Exam Results</h3>
      <div className="space-y-3">
        {examResults.map((result) => (
          <div
            key={result.id}
            className="flex justify-between items-center p-3 bg-slate-50 rounded-md"
          >
            <div>
              <h4 className="font-semibold text-gray-700">{result.exam}</h4>
              <p className="text-sm font-semibold text-gray-500">
                {result.date}
              </p>
            </div>
            <span
              className={`text-xl font-semibold ${getScoreColor(result.score)}`}
            >
              {result.score}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExamResults;
