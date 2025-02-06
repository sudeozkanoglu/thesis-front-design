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
import { useRouter } from "next/navigation";

const TeacherTable = ({ teachers, fetchTeachers }) => {
  const router = useRouter();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);

  // 📌 Güncelleme fonksiyonu (Öğretmen ID ile yönlendirme yapar)
  const handleUpdate = (teacherId) => {
    router.push(`/admin/updateTeacher/${teacherId}`);
  };

  // 📌 Silme işlemi için modal aç
  const confirmDelete = (teacherId) => {
    setSelectedTeacher(teacherId);
    setOpenDialog(true);
  };

  // 📌 Öğretmeni veritabanından sil
  const handleDelete = async () => {
    if (!selectedTeacher) return;
    
    try {
      const response = await fetch(`http://localhost:4000/api/teacher/${selectedTeacher}`, {
        method: "DELETE",
      });

      const data = await response.json();
      if (data.success) {
        alert("Teacher deleted successfully!");
        fetchTeachers(); // Güncellenmiş öğretmen listesini tekrar getir
      } else {
        alert("Error deleting teacher: " + data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while deleting the teacher.");
    } finally {
      setOpenDialog(false);
      setSelectedTeacher(null);
    }
  };

  return (
    <div className="bg-gray-100 p-6">
      <Typography variant="h4" color="primary" className="mb-4">
        Teachers List
      </Typography>

      {teachers.length > 0 ? (
        <Grid container spacing={3}>
          {teachers.map((teacher) => (
            <Grid item xs={12} sm={6} md={4} key={teacher._id}>
              <Card sx={{ borderRadius: "12px", boxShadow: 3, padding: 2 }}>
                <CardContent>
                  {/* Avatar ve İsim */}
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar
                      src={teacher.photo || "/default-avatar.png"} // Varsayılan avatar
                      alt={teacher.firstName}
                      sx={{ width: 80, height: 80 }}
                    />
                    <Typography variant="h6" fontWeight="bold">
                      {teacher.firstName} {teacher.lastName}
                    </Typography>
                  </Stack>

                  {/* Email ve Telefon */}
                  <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                    📧 {teacher.email}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    📞 {teacher.phoneNumber}
                  </Typography>

                  {/* Departman ve Uzmanlık Alanları */}
                  <Typography variant="subtitle1" color="secondary" sx={{ mt: 1 }}>
                    {teacher.department} - {teacher.degreeLevel}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                    <strong>Expertise:</strong> {teacher.expertiseAreas.join(", ") || "Not specified"}
                  </Typography>

                  {/* Ders ve Ofis Saatleri */}
                  <Typography variant="body2" sx={{ mt: 2, fontWeight: "bold" }}>
                    🏫 Room: {teacher.roomNumber || "N/A"}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    ⏳ Office Hours:{" "}
                    {teacher.officeHours.length > 0
                      ? teacher.officeHours.map(
                          (hour) => `${hour.day}: ${hour.startTime} - ${hour.endTime}`
                        ).join(", ")
                      : "Not available"}
                  </Typography>

                  {/* 📌 Güncelleme ve Silme Butonları */}
                  <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      sx={{ borderRadius: "8px" }}
                      onClick={() => handleUpdate(teacher._id)}
                    >
                      Update
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      fullWidth
                      sx={{ borderRadius: "8px" }}
                      onClick={() => confirmDelete(teacher._id)}
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
          No teachers available.
        </Typography>
      )}

      {/* 📌 Öğretmen Silme Onay Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Delete Teacher</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this teacher? This action cannot be undone.
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
    </div>
  );
};

export default TeacherTable;