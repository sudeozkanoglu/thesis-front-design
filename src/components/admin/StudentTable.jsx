"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Avatar,
  Stack,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useToast } from "@/components/context/ToastContext";
import StudentKnowledgeModal from "@/components/admin/StudentKnowledgeModal";

const StudentTable = ({ students, fetchStudents }) => {
  const { showToast } = useToast();
  const [openModal, setOpenModal] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  // 📌 Update function
  const handleUpdate = (student) => {
    setSelectedStudent(student);
    setOpenModal(true);
  };

  // 📌 Open delete confirmation dialog
  const confirmDelete = (studentId) => {
    setSelectedStudent(studentId);
    setOpenDialog(true);
  };

  // 📌 Delete student from database
  const handleDelete = async () => {
    if (!selectedStudent) return;

    try {
      const response = await fetch(
        `http://localhost:4000/api/students/${selectedStudent}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();
      if (data.success) {
        showToast("Student deleted successfully!", "success");
        fetchStudents(); // Refresh student list
      } else {
        showToast("Error deleting student: " + data.message, "error");
      }
    } catch (error) {
      console.error("Error:", error);
      showToast("An error occurred while deleting the student.", "error");
    } finally {
      setOpenDialog(false);
      setSelectedStudent(null);
    }
  };

  return (
    <div className="bg-gray-100 p-6">
      <Typography variant="h4" color="primary" className="mb-4">
        Students List
      </Typography>

      {students.length > 0 ? (
        <Grid container spacing={3}>
          {students.map((student) => (
            <Grid item xs={12} sm={6} md={4} key={student._id}>
              <Card sx={{ borderRadius: "12px", boxShadow: 3, padding: 2 }}>
                <CardContent>
                  {/* Avatar and Name */}
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar
                      sx={{
                        width: 80,
                        height: 80,
                        bgcolor: "primary.main",
                        fontSize: 24,
                      }}
                    >
                      {`${student.firstName?.charAt(0) ?? ""}${
                        student.lastName?.charAt(0) ?? ""
                      }`}
                    </Avatar>
                    <Typography variant="h6" fontWeight="bold">
                      {student.firstName} {student.lastName}
                    </Typography>
                  </Stack>

                  {/* Email */}
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{ mt: 1 }}
                  >
                    📧 {student.email}
                  </Typography>

                  {/* Enrolled Courses */}
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{ mt: 2 }}
                  >
                    📚 Courses:{" "}
                    {student.courses.length > 0
                      ? student.courses.map((course) => course.courseName).join(", ")
                      : "Not enrolled"}
                  </Typography>

                  {/* 📌 Update and Delete Buttons */}
                  <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      sx={{ borderRadius: "8px" }}
                      onClick={() => handleUpdate(student)}
                    >
                      Update
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      fullWidth
                      sx={{ borderRadius: "8px" }}
                      onClick={() => confirmDelete(student._id)}
                    >
                      Delete
                    </Button>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="body1" align="center" color="textSecondary">
          No students available.
        </Typography>
      )}

      {/* 📌 Delete Confirmation Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Delete Student</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this student? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* 📌 Student Update Modal */}
      <StudentKnowledgeModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        existingStudent={selectedStudent}
      />
    </div>
  );
};

export default StudentTable;
