"use client";
import React, { useState, useEffect } from "react";
import { 
  Card, CardContent, Button, Modal, Box, CircularProgress 
} from "@mui/material";
import { Search } from "lucide-react";
import AdminSidebar from "./AdminSidebar";
import AddCourseForm from "./CourseKnowledges";

const CourseList = () => {
  const [activeSection, setActiveSection] = useState("course-settings");
  const [openModal, setOpenModal] = useState(false);
  const [courses, setCourses] = useState([]); // API'den gelen dersleri saklar
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(""); // Arama için
  const [selectedCourse, setSelectedCourse] = useState(null); // Güncellenecek kursu saklar

  // 📌 Dersleri API'den çek
  const fetchCourses = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:4000/api/courses");
      const data = await response.json();
      if (data.success) {
        setCourses(data.courses);
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  // 📌 Kurs Güncelleme (Edit)
  const openEditModal = (course) => {
    setSelectedCourse(course);
    setOpenModal(true);
  };

  // 📌 Kurs Silme (Delete)
  const deleteCourse = async (courseId) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;

    try {
      const response = await fetch(`http://localhost:4000/api/courses/${courseId}`, {
        method: "DELETE",
      });

      const data = await response.json();
      if (data.success) {
        alert("Course deleted successfully!");
        fetchCourses(); // Listeyi güncelle
      } else {
        alert("Failed to delete course");
      }
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  // 📌 Dersleri filtrele (arama fonksiyonu)
  const filteredCourses = courses.filter(course =>
    course.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.courseCode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <AdminSidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      {/* Main Content */}
      <div className="p-6 flex-1">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Courses</h1>
            <div className="flex gap-4">
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Search courses..."
                  className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button
                variant="contained"
                color="primary"
                onClick={() => { setOpenModal(true); setSelectedCourse(null); }}
              >
                Add Course
              </Button>
            </div>
          </div>

          {/* 📌 Dersleri Yüklerken Spinner */}
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <CircularProgress />
            </div>
          ) : (
            <div className="grid gap-4">
              {filteredCourses.length > 0 ? (
                filteredCourses.map((course) => (
                  <Card key={course._id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <h2 className="text-xl font-semibold text-gray-700">
                            {course.courseName}
                          </h2>
                          <span className="inline-block bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded mt-2">
                            {course.courseCode}
                          </span>
                          <p className="text-gray-600 mt-2">{course.description}</p>
                          <p className="text-sm text-gray-500 mt-2">
                            <span className="font-medium">Exams:</span>{" "}
                            {course.exams.length > 0
                              ? course.exams.map((exam) => exam.examName).join(", ")
                              : "No exams"}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outlined"
                            color="primary"
                            size="small"
                            onClick={() => openEditModal(course)}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="contained"
                            color="error"
                            size="small"
                            onClick={() => deleteCourse(course._id)}
                          >
                            Delete
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <p className="text-gray-600 text-center">No courses found.</p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Modal - Add & Edit Course Form */}
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="add-course-modal"
        aria-describedby="form-to-add-course"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 600,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <AddCourseForm 
            onClose={() => { setOpenModal(false); fetchCourses(); }} 
            existingCourse={selectedCourse} // Güncellenecek kursu form'a geçir
          />
        </Box>
      </Modal>
    </div>
  );
};

export default CourseList;