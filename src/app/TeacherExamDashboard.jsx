
import React, { useState } from "react";
import {
  Card,
  CardContent,
  Button,
  Typography,
  Box,
  Chip,
  Container,
} from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import BookIcon from '@mui/icons-material/Book';

export default function TeacherDashboard() {
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
    { id:3,
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
    { id:6,
      name: "Data Structures",
      code: "CS301",
      students: 28,
      exams: ["Midterm", "Final"],
    }
  ]);

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header Card */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', md: 'row' }, 
            justifyContent: 'space-between',
            alignItems: { xs: 'stretch', md: 'center' },
            gap: 2
          }}>
            <Box>
              <Typography variant="h4" gutterBottom>
                My Courses
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                Manage your courses and exams
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Courses Container */}
      <Box sx={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        gap: 4,
      }}>
        {courses.map((course) => (
          <Card 
            key={course.id} 
            sx={{ 
              flexBasis: { xs: '100%', sm: 'calc(50% - 24px)', lg: 'calc(33.333% - 24px)' },
              flexGrow: 0,
              '&:hover': { 
                boxShadow: 6,
                transform: 'translateY(-2px)',
                transition: 'all 0.2s ease-in-out'
              }
            }}
          >
            <CardContent>
              <Box sx={{ mb: 2 }}>
                <Chip
                  label={course.code}
                  size="small"
                  sx={{ mb: 1 }}
                />
                <Typography variant="h6">{course.name}</Typography>
              </Box>

              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                mb: 2 
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <PersonIcon color="action" />
                  <Typography variant="body2">
                    {course.students} Students
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <BookIcon color="action" />
                  <Typography variant="body2">
                    {course.exams.length} Exams
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ 
                display: 'flex', 
                gap: 1, 
                mt: 2 
              }}>
                <Button variant="contained" fullWidth size="small" color="secondary">
                  View
                </Button>
                <Button variant="contained" fullWidth size="small" color="primary">
                  Edit
                </Button>
                <Button variant="contained" fullWidth size="small" color="error">
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