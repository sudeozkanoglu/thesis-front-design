"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  TextField,
  Button,
  Alert,
  IconButton,
  Stack,
  Typography,
  Divider
} from "@mui/material";
import { Delete, AddCircle } from "@mui/icons-material";

const AddCourseForm = ({ onClose }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    courseName: "",
    courseCode: "",
    description: "",
    exams: [""],
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addExam = () => {
    setFormData((prev) => ({
      ...prev,
      exams: [...prev.exams, ""], 
    }));
  };

  const updateExam = (index, value) => {
    const newExams = [...formData.exams];
    newExams[index] = value;
    setFormData((prev) => ({
      ...prev,
      exams: newExams,
    }));
  };

  const removeExam = (index) => {
    const newExams = [...formData.exams];
    newExams.splice(index, 1);
    setFormData((prev) => ({
      ...prev,
      exams: newExams,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!formData.courseName || !formData.courseCode) {
      setError("Please fill in all required fields");
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/api/courses/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success) {
        setSuccess(true);
        setTimeout(() => {
          onClose(); // Modal'ı kapat
          router.push("/admin/listCourse");
        }, 1000);
      } else {
        setError(data.message || "An error occurred");
      }
    } catch (error) {
      setError("An error occurred while adding the course.");
    }
  };

  return (
    <Card sx={{ maxWidth: 700, margin: "auto", boxShadow: 6, borderRadius: "12px" }}>
      <CardHeader
        title="Add New Course"
        sx={{
          backgroundColor: "primary.main",
          color: "white",
          textAlign: "center",
          padding: "20px",
          borderRadius: "12px 12px 0 0",
          boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)",
        }}
      />
      <CardContent>
        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            {/* Course Name & Code */}
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <TextField
                fullWidth
                label="Course Name"
                name="courseName"
                value={formData.courseName}
                onChange={handleChange}
                variant="outlined"
              />
              <TextField
                fullWidth
                label="Course Code"
                name="courseCode"
                value={formData.courseCode}
                onChange={handleChange}
                variant="outlined"
              />
            </Stack>

            {/* Description */}
            <TextField
              fullWidth
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              variant="outlined"
              multiline
              rows={3}
            />

            {/* Exams Section */}
            <Divider />
            <Typography variant="h6" color="primary">
              Exams
            </Typography>

            {formData.exams.map((exam, index) => (
              <Stack key={index} direction="row" spacing={2} alignItems="center">
                <TextField
                  fullWidth
                  label={`Exam ${index + 1}`}
                  value={exam}
                  onChange={(e) => updateExam(index, e.target.value)}
                  variant="outlined"
                />
                <IconButton color="error" onClick={() => removeExam(index)}>
                  <Delete />
                </IconButton>
              </Stack>
            ))}

            <Button
              type="button"
              variant="contained"
              color="primary"
              startIcon={<AddCircle />}
              onClick={addExam}
              sx={{ textTransform: "none", borderRadius: "8px" }}
            >
              Add Exam
            </Button>

            {/* Error & Success Messages */}
            {error && <Alert severity="error">{error}</Alert>}
            {success && <Alert severity="success">Course added successfully!</Alert>}

            {/* Submit & Cancel Buttons */}
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <Button
                type="submit"
                variant="contained"
                color="success"
                fullWidth
                sx={{ padding: "12px", borderRadius: "8px" }}
              >
                Submit
              </Button>
              <Button
                onClick={onClose}
                variant="outlined"
                color="error"
                fullWidth
                sx={{ padding: "12px", borderRadius: "8px" }}
              >
                Cancel
              </Button>
            </Stack>
          </Stack>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddCourseForm;