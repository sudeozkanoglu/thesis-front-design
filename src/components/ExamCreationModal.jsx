// components/ExamCreationModal.js
import React, { useState } from "react";
import {
  Modal,
  Box,
  TextField,
  Button,
  Typography,
  MenuItem,
} from "@mui/material";
import { useToast } from "./context/ToastContext";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 450,
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

const ExamCreationModal = ({ open, onClose, courseId, onExamCreated, teacherId }) => {
  const { showToast } = useToast();
  const [examForm, setExamForm] = useState({
    examName: "",
    examType: "",
    instructions: "",
  });

  const handleFormChange = (e) => {
    setExamForm({ ...examForm, [e.target.name]: e.target.value });
  };

  const handleAddExam = async () => {
    if (!examForm.examName || !examForm.examType) {
      showToast("Exam Name and Exam Type are required.", "error");
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/api/exams/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          examName: examForm.examName,
          course: courseId,
          examDate: "", 
          status: "pending",
          examType: examForm.examType,
          duration: "", 
          instructions: examForm.instructions || "",
          questions: [],
          createdBy: teacherId
        }),
      });

      const data = await response.json();

      if (data.success) {
        showToast("Exam created successfully!", "success");
        onExamCreated(); 
        setExamForm({ examName: "", examType: "", instructions: "" });
        onClose();
      } else {
        showToast(`Error: ${data.message}`, "error");
      }
    } catch (error) {
      console.error("Error adding exam:", error);
      showToast("Failed to create exam.", "error");
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <Typography variant="h6" className="mb-4 font-bold">
          Create New Exam
        </Typography>
        <TextField
          label="Exam Name"
          name="examName"
          value={examForm.examName}
          onChange={handleFormChange}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Exam Type"
          name="examType"
          select
          value={examForm.examType}
          onChange={handleFormChange}
          fullWidth
          required
          margin="normal"
        >
          <MenuItem value="quiz">Quiz</MenuItem>
          <MenuItem value="midterm">Midterm</MenuItem>
          <MenuItem value="final">Final</MenuItem>
        </TextField>
        <TextField
          label="Instructions"
          name="instructions"
          value={examForm.instructions}
          onChange={handleFormChange}
          multiline
          rows={3}
          fullWidth
          margin="normal"
        />
        <div className="flex justify-end gap-2 mt-4">
          <Button onClick={onClose} variant="outlined" color="secondary">
            Cancel
          </Button>
          <Button onClick={handleAddExam} variant="contained" color="primary">
            Create Exam
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default ExamCreationModal;