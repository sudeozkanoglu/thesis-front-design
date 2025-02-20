import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Button,
  Typography,
  Box,
  Chip,
  Container,
  CircularProgress,
  Divider,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import BookIcon from "@mui/icons-material/Book";
import {useRouter} from "next/navigation";

export default function TeacherExamDashboard({userId}) {
  const [teacher, setTeacher] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const router = useRouter();
  
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/api/teacher/user/${userId}`
        );
        const data = await response.json();

        if (data.success) {
          setTeacher(data.teacher);
          setCourses(data.teacher.courses);
        } else {
          setError("No courses found.");
        }
      } catch (err) {
        console.error("Error fetching courses:", err);
        setError("Failed to fetch courses.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [userId]);

  if (loading) {
    return (
      <Box className="flex justify-center items-center h-40">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography variant="h6" color="error" align="center">
        {error}
      </Typography>
    );
  }

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
        {courses?.map((course) => (
          <Card
            key={course._id}
            className="shadow-lg hover:shadow-2xl transition-transform duration-300 hover:-translate-y-2 bg-slate-50"
          >
            <CardContent>
              <Box className="mb-6 text-center">
                <Chip
                  label={course.courseCode}
                  size="small"
                  className="mb-2 bg-indigo-100 text-indigo-600"
                />
                <Typography
                  variant="h6"
                  className="font-medium text-gray-800"
                >
                  {course.courseName}
                </Typography>
              </Box>

              <Divider className="mb-4" />

              <Box className="flex justify-around mb-6">
                <Box className="flex items-center gap-2">
                  <PersonIcon fontSize="small" className="text-indigo-600" />
                  <Typography variant="body2" className="text-gray-600">
                    {course.students ? course.students : 0} Students
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
                  onClick={() => router.push("/lessonView")}
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
