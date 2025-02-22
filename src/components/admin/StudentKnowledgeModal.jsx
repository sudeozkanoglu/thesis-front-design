"use client";
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

const StudentKnowledgeModal = ({ open, onClose, existingStudent }) => {
  const [studentData, setStudentData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    courses: [],
  });

  const [availableCourses, setAvailableCourses] = useState([]);

  useEffect(() => {
    if (existingStudent) {
      setStudentData({
        firstName: existingStudent.firstName || "",
        lastName: existingStudent.lastName || "",
        email: existingStudent.email || "",
        courses: existingStudent.courses?.map((course) =>
          typeof course === "object" ? course._id : course
        ) ?? [],
      });
    }

    // Fetch available courses
    const fetchCourses = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/courses");
        const data = await response.json();
        setAvailableCourses(data.courses ?? []);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, [existingStudent]);

  // 📌 Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudentData((prev) => ({ ...prev, [name]: value }));
  };

  // 📌 Handle courses change
  const handleCoursesChange = (e) => {
    setStudentData((prev) => ({ ...prev, courses: e.target.value }));
  };

  // 📌 Handle form submission
  const handleSubmit = async () => {
    try {
      const response = await fetch(`http://localhost:4000/api/students/${existingStudent._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(studentData),
      });

      const data = await response.json();
      if (data.success) {
        alert("Student updated successfully!");
        onClose(); // Close modal after success
      } else {
        alert("Error updating student: " + data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while updating the student.");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        {existingStudent ? "Update Student Information" : "Add New Student"}
      </DialogTitle>
      <DialogContent>
        <TextField
          label="First Name"
          name="firstName"
          value={studentData.firstName}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />

        <TextField
          label="Last Name"
          name="lastName"
          value={studentData.lastName}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />

        <TextField
          label="Email"
          name="email"
          value={studentData.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />

        <FormControl fullWidth margin="normal">
          <InputLabel>Courses</InputLabel>
          <Select
            multiple
            value={studentData.courses}
            onChange={handleCoursesChange}
            renderValue={(selected) =>
              selected
                .map((courseId) => {
                  const course = availableCourses.find((c) => c._id === courseId);
                  return course ? `${course.courseName}` : "";
                })
                .join(", ")
            }
          >
            {availableCourses.map((course) => (
              <MenuItem key={course._id} value={course._id}>
                {course.courseName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          {existingStudent ? "Update" : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default StudentKnowledgeModal;