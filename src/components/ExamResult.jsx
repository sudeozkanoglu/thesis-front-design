"use client";

import React, {useEffect, useState} from "react";

const ExamResults = ({student}) => {
  const [examResults, setExamResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      if (!student) return;
      try {
        const res = await fetch(
          `http://localhost:4000/api/exam-submissions/${student}/latest`
        );
        const data = await res.json();
        if (data.success) {
          setExamResults(data.results);
        }
      } catch (err) {
        console.error("Error loading exam results:", err);
      }
    };
  
    fetchResults();
  }, [student]);

  const getScoreColor = (score) => {
    if (score > 85) return "text-green-600";
    if (score > 60) return "text-yellow-600";
    if (score > 45) return "text-orange-600";
    return "text-red-600";
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 text-black ">
      <h3 className="text-lg font-semibold mb-4">Latest 5 Exam Results</h3>
      <div className="space-y-3">
        {examResults.map((result) => (
          <div
            key={result.id}
            className="flex justify-between items-center p-3 bg-slate-50 rounded-md"
          >
            <div>
              <h4 className="font-semibold text-gray-700">{result.exam}</h4>
              <p className="text-sm text-gray-500 italic">{result.courseName}</p>
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
