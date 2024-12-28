import React from 'react';
import { Card, CardContent, Badge, Button } from "@mui/material";
import {
  CheckCircle as CheckCircle2,
  Cancel as XCircle,
  Add as Plus,
  BarChart as BarChart3,
  AccessTime as Clock,
  EmojiEvents as Award,
  Description as FileText
} from '@mui/icons-material';

const TeacherLessonView = () => {
  const lessonContent = {
    title: "Technical English for Engineers",
    description: "Essential technical terminology and communication skills for engineering contexts and problem-solving",
    totalExams: 5,
    completedExams: 3,
    exams: [
      {
        id: 1,
        title: "Speaking Assestment A",
        status: "completed",
        score: 86,
        timeSpent: "45 min",
        totalQuestions: 20,
        correctAnswers: 17,
        completedDate: "2024-15-11",
        studentResults: [
          { name: "Score 90+", count: 15 },
          { name: "Score 80-89", count: 25 },
          { name: "Score 70-79", count: 18 },
          { name: "Score <70", count: 12 }
        ]
      },
      {
        id: 2,
        title: "Speaking Assestment B",
        status: "completed",
        score: 78,
        timeSpent: "38 min",
        totalQuestions: 15,
        correctAnswers: 14,
        completedDate: "2024-28-11",
        studentResults: [
          { name: "Score 90+", count: 20 },
          { name: "Score 80-89", count: 22 },
          { name: "Score 70-79", count: 15 },
          { name: "Score <70", count: 8 }
        ]
      },
      {
        id: 3,
        title: "Speaking Assestment C",
        status: "pending",
        dueDate: "2024-25-12"
      },
      {
        id: 4,
        title: "Midterm Test",
        status: "completed",
        score: 90,
        timeSpent: "50 min",
        totalQuestions: 25,
        correctAnswers: 20,
        completedDate: "2024-10-12",
        studentResults: [
          { name: "Score 90+", count: 12 },
          { name: "Score 80-89", count: 28 },
          { name: "Score 70-79", count: 20 },
          { name: "Score <70", count: 15 }
        ]
      },
      {
        id: 5,
        title: "Final Exam",
        status: "pending",
        dueDate: "2025-10-01"
      }
    ]
  };

  const calculateParticipationRate = (studentResults) => {
    const totalStudents = studentResults.reduce((sum, group) => sum + group.count, 0);
    return totalStudents > 0 ? `${totalStudents} students` : "No participants";
  };

  const ExamStatistics = ({ exam }) => {
    if (exam.status !== "completed") return null;

    const highestScoreGroup = exam.studentResults.reduce((prev, current) => (prev.name > current.name ? prev : current));
    const lowestScoreGroup = exam.studentResults.reduce((prev, current) => (prev.name < current.name ? prev : current));

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div className="flex items-center gap-2 bg-blue-50 p-2 rounded-lg">
          <Award className="w-4 h-4 text-blue-500" />
          <div>
            <p className="text-sm text-gray-600">Average Score</p>
            <p className="text-lg font-semibold">{exam.score}%</p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-green-50 p-2 rounded-lg">
          <FileText className="w-4 h-4 text-green-500" />
          <div>
            <p className="text-sm text-gray-600">Success Rate</p>
            <p className="text-lg font-semibold">{Math.round((exam.correctAnswers / exam.totalQuestions) * 100)}%</p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-orange-50 p-2 rounded-lg">
          <Clock className="w-4 h-4 text-orange-500" />
          <div>
            <p className="text-sm text-gray-600">Avg. Time Spent</p>
            <p className="text-lg font-semibold">{exam.timeSpent}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-purple-50 p-2 rounded-lg">
          <BarChart3 className="w-4 h-4 text-purple-500" />
          <div>
            <p className="text-sm text-gray-600">Participation</p>
            <p className="text-lg font-semibold">{calculateParticipationRate(exam.studentResults)}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-red-50 p-2 rounded-lg">
          <XCircle className="w-4 h-4 text-red-500" />
          <div>
            <p className="text-sm text-gray-600">Lowest Score</p>
            <p className="text-lg font-semibold">{lowestScoreGroup.name}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-teal-50 p-2 rounded-lg">
          <CheckCircle2 className="w-4 h-4 text-teal-500" />
          <div>
            <p className="text-sm text-gray-600">Highest Score</p>
            <p className="text-lg font-semibold">{highestScoreGroup.name}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <Card className="mb-8 bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardContent className="p-6">
          <div className="flex flex-col">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-3xl font-bold mb-2">{lessonContent.title}</h2>
                <p className="text-gray-600 text-lg">{lessonContent.description}</p>
              </div>
              <Badge variant="outlined" className="text-blue-700 text-lg px-4 py-2">
                {lessonContent.completedExams}/{lessonContent.totalExams} Completed
              </Badge>
            </div>
            <div>
              <p className="text-sm font-semibold  text-gray-600 mb-2">Overall Progress</p>
              <progress
                value={(lessonContent.completedExams / lessonContent.totalExams) * 100}
                className="h-3"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {lessonContent.exams.map((exam) => (
          <Card key={exam.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  {exam.status === "completed" ? (
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                  ) : (
                    <XCircle className="w-5 h-5 text-gray-400" />
                  )}
                  <div>
                    <h3 className="font-semibold text-lg">{exam.title}</h3>
                    <p className="text-sm text-gray-600">
                      {exam.status === "completed"
                        ? `Completed on ${new Date(exam.completedDate).toLocaleDateString()}`
                        : `Due by ${new Date(exam.dueDate).toLocaleDateString()}`}
                    </p>
                  </div>
                </div>
                {exam.status === "pending" && (
                  <div className='flex justify-center items-center h-full'>
                    <div className="flex justify-center">
                    <Button size="small" className="bg-blue-500 text-white hover:bg-blue-600 flex justify-center">
                      <Plus className="w-4 h-4 mr-1" />
                      Take Exam
                    </Button>
                    </div>
                  </div>
                )}
              </div>
              <ExamStatistics exam={exam} />
              {exam.status === "pending" && (
                <div className="flex justify-center items-center h-full mt-24">
                  <p className='text-gray-500 text-lg font-medium'>No exams have been taken yet.</p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TeacherLessonView;
