import React, { useState } from "react";
import {
  Card,
  CardContent,
  Button,
  Typography,
  Box,
  Chip,
  Container,
  Divider,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import BookIcon from "@mui/icons-material/Book";

export default function TeacherExamDashboard() {
  const [courses, setCourses] = useState([
    {
      id: 1,
      name: "Introduction to AI",
      code: "AI101",
      students: 45,
      exams: ["Midterm", "Final"],
    },
    {
      id: 2,
      name: "Advanced Programming",
      code: "CS202",
      students: 32,
      exams: ["Quiz 1", "Final"],
    },
    {
      id: 3,
      name: "Data Structures",
      code: "CS301",
      students: 28,
      exams: ["Midterm", "Final"],
    },
    {
      id: 4,
      name: "Introduction to AI",
      code: "AI101",
      students: 45,
      exams: ["Midterm", "Final"],
    },
    {
      id: 5,
      name: "Advanced Programming",
      code: "CS202",
      students: 32,
      exams: ["Quiz 1", "Final"],
    },
    {
      id: 6,
      name: "Data Structures",
      code: "CS301",
      students: 28,
      exams: ["Midterm", "Final"],
    },
  ]);

  return (
    <Container maxWidth="xl" className="py-10">
      {/* Header Section */}
      <Box className="text-center mb-10">
        <Typography
          variant="h3"
          className="font-bold text-gray-800"
        >
          My Courses
        </Typography>
        <Typography
          variant="subtitle1"
          className="mt-2 text-gray-600"
        >
          Manage your courses and exams with ease
        </Typography>
      </Box>

      {/* Courses Section */}
      <Box className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.map((course) => (
          <Card
            key={course.id}
            className="shadow-lg hover:shadow-2xl transition-transform duration-300 hover:-translate-y-2 bg-slate-50"
          >
            <CardContent>
              <Box className="mb-6 text-center">
                <Chip
                  label={course.code}
                  size="small"
                  className="mb-2 bg-indigo-100 text-indigo-600"
                />
                <Typography
                  variant="h6"
                  className="font-medium text-gray-800"
                >
                  {course.name}
                </Typography>
              </Box>

              <Divider className="mb-4" />

              <Box className="flex justify-around mb-6">
                <Box className="flex items-center gap-2">
                  <PersonIcon fontSize="small" className="text-indigo-600" />
                  <Typography variant="body2" className="text-gray-600">
                    {course.students} Students
                  </Typography>
                </Box>
                <Box className="flex items-center gap-2">
                  <BookIcon fontSize="small" className="text-indigo-600" />
                  <Typography variant="body2" className="text-gray-600">
                    {course.exams.length} Exams
                  </Typography>
                </Box>
              </Box>

              <Box className="flex gap-2">
                <Button
                  variant="contained"
                  size="small"
                  color="secondary"
                  className="w-full bg-gradient-to-r from-indigo-500 to-indigo-700 text-white"
                >
                  View
                </Button>
                <Button
                  variant="contained"
                  size="small"
                  color="primary"
                  className="w-full bg-gradient-to-r from-purple-500 to-purple-700 text-white"
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  size="small"
                  color="error"
                  className="w-full bg-gradient-to-r from-pink-500 to-pink-700 text-white"
                >
                  Delete
                </Button>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Container>
  );
}
