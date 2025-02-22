import React from "react";
import { Modal, Box, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import TeacherKnowledgeForm from '@/components/admin/TeacherKnowledgeForm'

const TeacherKnowledgeModal = ({ open, onClose, existingTeacher }) => {
    
  return (
    <Modal open={open} onClose={onClose} aria-labelledby="modal-title">
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "90%",
          maxWidth: "900px",
          maxHeight: "90vh",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          overflowY: "auto",
          borderRadius: "12px",
        }}
      >
        <div className="flex justify-between items-center mb-4">
          <Typography id="modal-title" variant="h5" fontWeight="bold">
            {existingTeacher ? "Update Teacher" : "Add New Teacher"}
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </div>

        <TeacherKnowledgeForm existingTeacher={existingTeacher} onClose={onClose} />
      </Box>
    </Modal>
  );
};

export default TeacherKnowledgeModal;