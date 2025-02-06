"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function TeacherKnowledgeForm() {
  const router = useRouter();
  const [courses, setCourses] = useState([]);
  const [formData, setFormData] = useState({
    // Part 1: Personal Information
    firstName: "",
    lastName: "",
    degreeLevel: "",
    department: "",
    photo: null,

    // Part 2: Contact Information
    phoneNumber: "",
    email: "",
    password: "",
    roomNumber: "",

    // Part 3: Educational Background
    schools: [{ name: "", degree: ""}],

    // Part 4: Areas of Expertise
    expertiseAreas: [""],

    // Part 5: Current Courses
    courses: [],

    // Part 6: Office Hours
    officeHours: [{ day: "", startTime: "", endTime: "" }],
  });

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/courses"); // Backend URL
        const data = await response.json();
        if (data.success) {
          setCourses(data.courses); // Veritabanından gelen dersleri state'e kaydet
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
        setFormData((prev) => ({
            ...prev,
            photo: file,
        }));
    }
};

  const addCourse = () => {
    setFormData((prev) => ({
      ...prev,
      courses: [
        ...prev.courses,
        { courseName: "", courseCode: "", exams: [""] },
      ],
    }));
  };

  const updateCourse = (index, field, value) => {
    const newCourses = [...formData.courses];
    newCourses[index][field] = value;
    setFormData((prev) => ({
      ...prev,
      courses: newCourses,
    }));
  };

  const addExamToCourse = (courseIndex) => {
    const newCourses = [...formData.courses];
    newCourses[courseIndex].exams.push("");
    setFormData((prev) => ({
      ...prev,
      courses: newCourses,
    }));
  };

  const updateExam = (courseIndex, examIndex, value) => {
    const newCourses = [...formData.courses];
    newCourses[courseIndex].exams[examIndex] = value;
    setFormData((prev) => ({
      ...prev,
      courses: newCourses,
    }));
  };

  const addSchool = () => {
    setFormData((prev) => ({
      ...prev,
      schools: [...prev.schools, { name: "", degree: ""}],
    }));
  };

  const updateSchool = (index, field, value) => {
    const newSchools = [...formData.schools];
    newSchools[index][field] = value;
    setFormData((prev) => ({
      ...prev,
      schools: newSchools,
    }));
  };

  const addExpertiseArea = () => {
    setFormData((prev) => ({
      ...prev,
      expertiseAreas: [...prev.expertiseAreas, ""],
    }));
  };

  const updateExpertiseArea = (index, value) => {
    const newExpertiseAreas = [...formData.expertiseAreas];
    newExpertiseAreas[index] = value;
    setFormData((prev) => ({
      ...prev,
      expertiseAreas: newExpertiseAreas,
    }));
  };

  const addOfficeHours = () => {
    setFormData((prev) => ({
      ...prev,
      officeHours: [
        ...prev.officeHours,
        { day: "", startTime: "", endTime: "" },
      ],
    }));
  };

  const updateOfficeHours = (index, field, value) => {
    const newOfficeHours = [...formData.officeHours];
    newOfficeHours[index][field] = value;
    setFormData((prev) => ({
      ...prev,
      officeHours: newOfficeHours,
    }));
  };

  const handleCourseSelect = (e) => {
    const selectedCourseId = e.target.value;

    if (!formData.courses.some((course) => course._id === selectedCourseId)) {
      const selectedCourse = courses.find((course) => course._id === selectedCourseId);
      setFormData((prev) => ({
        ...prev,
        courses: [...prev.courses, selectedCourse], // Seçilen dersi ekle
      }));
    }
  };

  // 📌 Seçilen dersi kaldır
  const removeCourse = (courseId) => {
    setFormData((prev) => ({
      ...prev,
      courses: prev.courses.filter((course) => course._id !== courseId),
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      if (["schools", "expertiseAreas", "officeHours", "courses"].includes(key)) {
        formDataToSend.append(key, JSON.stringify(formData[key])); // JSON olarak gönder
      } else {
        formDataToSend.append(key, formData[key]);
      }
    });
  
    try {
      const response = await fetch("http://localhost:4000/api/teacher/add", {
        method: "POST",
        body: formDataToSend,
      });
  
      const data = await response.json();
  
      if (data.success) {
        alert("Teacher added successfully!");
        router.push('/admin/listTeacher');
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="container mx-auto p-6 bg-gray-100 text-black">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-8 space-y-6"
      >
        {/* Part 1: Personal Information */}
        <div className="border-b pb-4">
          <h2 className="text-xl font-bold mb-4 bg-blue-100 p-3 rounded-lg text-blue-800 border-l-4 border-blue-500">
            Personal Information
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 font-bold">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                placeholder="Laura"
                required
              />
            </div>
            <div>
              <label className="block mb-2 font-bold">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                placeholder="Smith"
                required
              />
            </div>
            <div>
              <label className="block mb-2 font-bold">Degree Level</label>
              <input
                type="text"
                name="degreeLevel"
                value={formData.degreeLevel}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                placeholder="Senior English Teacher"
                required
              />
            </div>
            <div>
              <label className="block mb-2 font-bold">Department</label>
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                placeholder="English Department"
                required
              />
            </div>
            <div>
              <label className="block mb-2 font-bold">Profile Photo</label>
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="w-full p-2 border rounded"
              />
              {formData.photo && (
                <img
                  src={formData.photo}
                  alt="Profile"
                  className="mt-2 w-32 h-32 object-cover rounded"
                />
              )}
            </div>
          </div>
        </div>

        {/* Part 2: Contact Information */}
        <div className="border-b pb-4">
          <h2 className="text-xl font-bold mb-4 bg-green-100 p-3 rounded-lg text-green-800 border-l-4 border-green-500">
            Contact Information
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 font-bold">Phone Number</label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                placeholder="(555) 555-5555"
                required
              />
            </div>
            <div>
              <label className="block mb-2 font-bold">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                placeholder="example@hotmail.com"
                required
              />
            </div>
            <div>
              <label className="block mb-2 font-bold">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                placeholder="********"
                required
              />
            </div>
            <div>
              <label className="block mb-2 font-bold">Room Number</label>
              <input
                type="text"
                name="roomNumber"
                value={formData.roomNumber}
                onChange={handleChange}
                placeholder="Room 101"
                className="w-full p-2 border rounded"
              />
            </div>
          </div>
        </div>

        {/* Part 3: Educational Background */}
        <div className="border-b pb-4">
          <h2 className="text-xl font-bold mb-4 bg-purple-100 p-3 rounded-lg text-purple-800 border-l-4 border-purple-500">
            Educational Background
          </h2>
          {formData.schools.map((school, index) => (
            <div key={index} className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block mb-2 font-bold">School Name</label>
                <input
                  type="text"
                  value={school.name}
                  onChange={(e) => updateSchool(index, "name", e.target.value)}
                  placeholder="University of California"
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block mb-2 font-bold">Field of Study</label>
                <input
                  type="text"
                  value={school.degree}
                  onChange={(e) =>
                    updateSchool(index, "degree", e.target.value)
                  }
                  placeholder="Bachelor of Arts in English"
                  className="w-full p-2 border rounded"
                />
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={addSchool}
            className="bg-blue-200 text-blue-800 border-l-4 border-blue-500 font-bold px-4 py-2 rounded hover:bg-blue-300"
          >
            Add School
          </button>
        </div>

        {/* Part 4: Areas of Expertise */}
        <div className="border-b pb-4">
          <h2 className="text-xl font-bold mb-4 bg-red-100 p-3 rounded-lg text-red-800 border-l-4 border-red-500">
            Areas of Expertise
          </h2>
          {formData.expertiseAreas.map((area, index) => (
            <div key={index} className="mb-4">
              <label className="block mb-2 font-bold">Expertise Area</label>
              <input
                type="text"
                value={area}
                onChange={(e) => updateExpertiseArea(index, e.target.value)}
                placeholder="English Literature"
                className="w-full p-2 border rounded"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={addExpertiseArea}
            className="bg-blue-200 text-blue-800 border-l-4 font-bold border-blue-500 px-4 py-2 rounded hover:bg-blue-300"
          >
            Add Expertise Area
          </button>
        </div>

        {/* Part 5: Current Courses */}
        <div className="border-b pb-4">
          <h2 className="text-xl font-bold mb-4 text-pink-800">Select Courses</h2>
          <select onChange={handleCourseSelect} className="w-full p-2 border rounded">
            <option value="">Select a Course</option>
            {courses.map((course) => (
              <option key={course._id} value={course._id}>
                {course.courseName} ({course.courseCode})
              </option>
            ))}
          </select>

          {/* Seçilen dersleri göster */}
          <div className="mt-4 space-y-2">
            {formData.courses.map((course) => (
              <div key={course._id} className="flex justify-between p-2 border rounded bg-gray-100">
                <span>{course.courseName} ({course.courseCode})</span>
                <button type="button" onClick={() => removeCourse(course._id)} className="text-red-500 font-bold">Remove</button>
              </div>
            ))}
          </div>
        </div>

        {/* Part 6: Office Hours */}
        <div>
          <h2 className="text-xl font-bold mb-4 bg-yellow-100 p-3 rounded-lg text-yellow-800 border-l-4 border-yellow-500">
            Office Hours
          </h2>
          {formData.officeHours.map((hours, index) => (
            <div key={index} className="grid grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block mb-2 font-bold">Day</label>
                <select
                  value={hours.day}
                  onChange={(e) =>
                    updateOfficeHours(index, "day", e.target.value)
                  }
                  className="w-full p-2 border rounded"
                >
                  <option value="">Select Day</option>
                  <option value="Monday">Monday</option>
                  <option value="Tuesday">Tuesday</option>
                  <option value="Wednesday">Wednesday</option>
                  <option value="Thursday">Thursday</option>
                  <option value="Friday">Friday</option>
                </select>
              </div>
              <div>
                <label className="block mb-2 font-bold">Start Time</label>
                <input
                  type="time"
                  value={hours.startTime}
                  onChange={(e) =>
                    updateOfficeHours(index, "startTime", e.target.value)
                  }
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block mb-2 font-bold">End Time</label>
                <input
                  type="time"
                  value={hours.endTime}
                  onChange={(e) =>
                    updateOfficeHours(index, "endTime", e.target.value)
                  }
                  className="w-full p-2 border rounded"
                />
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={addOfficeHours}
            className="bg-blue-200 text-blue-800 border-l-4 font-bold border-blue-500 px-4 py-2 rounded hover:bg-blue-300"
          >
            Add Office Hours
          </button>
        </div>

        {/* Submit Button */}
        <div className="mt-6">
          <button
            type="submit"
            className="w-full bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 transition duration-300"
          >
            Submit Teacher Information
          </button>
        </div>
      </form>
    </div>
  );
}
