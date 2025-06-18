"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "../context/ToastContext";

export default function TeacherKnowledgeForm({ existingTeacher, onClose }) {
  const { showToast } = useToast();
  const router = useRouter();
  const [courses, setCourses] = useState([]);
  const [formData, setFormData] = useState({
    // Part 1: Personal Information
    firstName: "",
    lastName: "",
    degreeLevel: "",
    department: "",

    // Part 2: Contact Information
    phoneNumber: "",
    email: "",
    password: "",
    roomNumber: "",

    // Part 3: Educational Background
    schools: [{ name: "", degree: "" }],

    // Part 4: Areas of Expertise
    expertiseAreas: [""],

    // Part 5: Current Courses
    courses: [],

    // Part 6: Office Hours
    officeHours: [{ day: "", startTime: "", endTime: "" }],
  });

  useEffect(() => {
    if (existingTeacher) {
      setFormData({
        ...existingTeacher,
      });
    }
  }, [existingTeacher]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/courses");
        const data = await response.json();

        if (data.success) {
          setCourses(data.courses);

          // 🔑 Eğer öğretmenin mevcut dersleri varsa bunları eşle
          if (existingTeacher && existingTeacher.courses.length > 0) {
            const matchedCourses = data.courses.filter((course) =>
              existingTeacher.courses.includes(course._id)
            );

            setFormData((prev) => ({
              ...prev,
              courses: matchedCourses,
            }));
          }
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, [existingTeacher]);

  const addSchool = () => {
    setFormData((prev) => ({
      ...prev,
      schools: [...prev.schools, { name: "", degree: "" }],
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
      const selectedCourse = courses.find(
        (course) => course._id === selectedCourseId
      );
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

  const [formErrors, setFormErrors] = useState({});

  const validateForm = () => {
    const errors = {};

    if (!formData.firstName.trim()) errors.firstName = "First name is required";
    if (!formData.lastName.trim()) errors.lastName = "Last name is required";
    if (!formData.degreeLevel.trim()) errors.degreeLevel = "Degree is required";
    if (!formData.department.trim())
      errors.department = "Department is required";
    if (!formData.phoneNumber.trim()) errors.phoneNumber = "Phone is required";
    if (!formData.email.trim()) errors.email = "Email is required";
    if (!formData.password.trim()) errors.password = "Password is required";
    if (!formData.roomNumber.trim())
      errors.roomNumber = "Room number is required";
    if (formData.schools.some((school) => !school.name.trim()))
      errors.schools = "All school names are required";
    if (formData.schools.some((school) => !school.degree.trim()))
      errors.schools = "All degrees are required";
    if (formData.expertiseAreas.some((area) => !area.trim()))
      errors.expertiseAreas = "All expertise areas are required";
    if (formData.officeHours.some((hours) => !hours.day.trim()))
      errors.officeHours = "All office hours days are required";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      showToast("Please fill in the required fields.", "error");
      return;
    }
    const url = existingTeacher
      ? `http://localhost:4000/api/teacher/${existingTeacher._id}`
      : "http://localhost:4000/api/teacher/add";

    try {
      const response = await fetch(url, {
        method: existingTeacher ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // FormData yerine JSON gönder
      });

      const data = await response.json();

      if (data.success) {
        showToast(
          existingTeacher
            ? "Teacher updated successfully!"
            : "Teacher added successfully!",
          "success"
        );
        if (typeof onClose === "function") {
          onClose();
        } else {
          router.push("/admin/listTeacher");
        }

        router.refresh();
      } else {
        showToast(`Error: ${data.message}`, "error");
      }
    } catch (error) {
      console.error("Error:", error);
      showToast("An error occurred. Please try again.", "error");
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
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
                className={`w-full p-2 border rounded ${
                  formErrors.firstName ? "border-red-500" : ""
                }`}
                placeholder="Laura"
                required
              />
              {formErrors.firstName && (
                <p className="text-red-500 text-sm mt-1">
                  {formErrors.firstName}
                </p>
              )}
            </div>
            <div>
              <label className="block mb-2 font-bold">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
                className={`w-full p-2 border rounded ${
                  formErrors.lastName ? "border-red-500" : ""
                }`}
                placeholder="Smith"
                required
              />
              {formErrors.lastName && (
                <p className="text-red-500 text-sm mt-1">
                  {formErrors.lastName}
                </p>
              )}
            </div>
            <div>
              <label className="block mb-2 font-bold">Degree Level</label>
              <input
                type="text"
                name="degreeLevel"
                value={formData.degreeLevel}
                onChange={(e) =>
                  setFormData({ ...formData, degreeLevel: e.target.value })
                }
                className={`w-full p-2 border rounded ${
                  formErrors.degreeLevel ? "border-red-500" : ""
                }`}
                placeholder="Senior English Teacher"
                required
              />
              {formErrors.degreeLevel && (
                <p className="text-red-500 text-sm mt-1">
                  {formErrors.degreeLevel}
                </p>
              )}
            </div>
            <div>
              <label className="block mb-2 font-bold">Department</label>
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={(e) =>
                  setFormData({ ...formData, department: e.target.value })
                }
                className={`w-full p-2 border rounded ${
                  formErrors.department ? "border-red-500" : ""
                }`}
                placeholder="English Department"
                required
              />
              {formErrors.department && (
                <p className="text-red-500 text-sm mt-1">
                  {formErrors.department}
                </p>
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
                onChange={(e) =>
                  setFormData({ ...formData, phoneNumber: e.target.value })
                }
                className={`w-full p-2 border rounded ${
                  formErrors.phoneNumber ? "border-red-500" : ""
                }`}
                placeholder="(555) 555-5555"
                required
              />
              {formErrors.phoneNumber && (
                <p className="text-red-500 text-sm mt-1">
                  {formErrors.phoneNumber}
                </p>
              )}
            </div>
            <div>
              <label className="block mb-2 font-bold">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className={`w-full p-2 border rounded ${
                  formErrors.email ? "border-red-500" : ""
                }`}
                placeholder="example@hotmail.com"
                required
              />
              {formErrors.email && (
                <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
              )}
            </div>
            <div>
              <label className="block mb-2 font-bold">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className={`w-full p-2 border rounded ${
                  formErrors.password ? "border-red-500" : ""
                }`}
                placeholder="********"
                required
              />
              {formErrors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {formErrors.password}
                </p>
              )}
            </div>
            <div>
              <label className="block mb-2 font-bold">Room Number</label>
              <input
                type="text"
                name="roomNumber"
                value={formData.roomNumber}
                onChange={(e) =>
                  setFormData({ ...formData, roomNumber: e.target.value })
                }
                placeholder="Room 101"
                className={`w-full p-2 border rounded ${
                  formErrors.roomNumber ? "border-red-500" : ""
                }`}
              />
              {formErrors.roomNumber && (
                <p className="text-red-500 text-sm mt-1">
                  {formErrors.roomNumber}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Part 3: Educational Background */}
        <div className="border-b pb-4">
          <h2 className="text-xl font-bold mb-4 bg-purple-100 p-3 rounded-lg text-purple-800 border-l-4 border-purple-500">
            Educational Background
          </h2>
          {formData.schools.map((school, index) => (
            <div
              key={`school-${index}`}
              className="grid grid-cols-2 gap-4 mb-4"
            >
              <div>
                <label className="block mb-2 font-bold">School Name</label>
                <input
                  type="text"
                  value={school.name}
                  onChange={(e) => updateSchool(index, "name", e.target.value)}
                  placeholder="University of California"
                  className={`w-full p-2 border rounded ${
                    formErrors.schools ? "border-red-500" : ""
                  }`}
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
                  className={`w-full p-2 border rounded ${
                    formErrors.schools ? "border-red-500" : ""
                  }`}
                />
              </div>
              {formErrors.schools && (
                <div className="col-span-2">
                  <p className="text-red-500 text-sm mt-1">
                    {formErrors.schools}
                  </p>
                </div>
              )}
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
            <div key={`expertise-${index}`} className="mb-4">
              <label className="block mb-2 font-bold">Expertise Area</label>
              <input
                type="text"
                value={area}
                onChange={(e) => updateExpertiseArea(index, e.target.value)}
                placeholder="English Literature"
                className={`w-full p-2 border rounded ${
                  formErrors.expertiseAreas ? "border-red-500" : ""
                }`}
              />
            </div>
          ))}
          {formErrors.expertiseAreas && (
            <p className="text-red-500 text-sm mt-1">
              {formErrors.expertiseAreas}
            </p>
          )}
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
          <h2 className="text-xl font-bold mb-4 text-pink-800">
            Select Courses
          </h2>
          <select
            onChange={handleCourseSelect}
            className="w-full p-2 border rounded"
          >
            <option value="">Select a Course</option>
            {courses.map((course) => (
              <option key={course._id} value={course._id}>
                {course.courseName} ({course.courseCode})
              </option>
            ))}
          </select>

          {/* Seçilen dersleri göster */}
          <div className="mt-4 space-y-2">
            {formData.courses.map((course, index) => (
              <div
                key={course._id || `course-${index}`}
                className="flex justify-between p-2 border rounded bg-gray-100"
              >
                <span>
                  {course.courseName} ({course.courseCode})
                </span>
                <button
                  type="button"
                  onClick={() => removeCourse(course._id)}
                  className="text-red-500 font-bold"
                >
                  Remove
                </button>
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
            <div
              key={`office-hour-${index}`}
              className="grid grid-cols-3 gap-4 mb-4"
            >
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
            type="button"
            onClick={handleSubmit}
            className="w-full bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 transition duration-300"
          >
            Submit Teacher Information
          </button>
        </div>
      </form>
    </div>
  );
}
