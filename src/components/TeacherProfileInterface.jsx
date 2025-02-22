import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Badge,
  CircularProgress,
} from "@mui/material";
import {
  Calendar,
  Mail,
  Phone,
  MapPin,
  Award,
  BookOpen,
  Clock,
  GraduationCap,
  Building2,
} from "lucide-react";
import Avatar from "@mui/material/Avatar";

const TeacherProfileInterface = ({ userId }) => {
  const [teacher, setTeacher] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/api/teacher/${userId}`
        );
        const data = await response.json();
        if (data.success) {
          setTeacher(data.teacher);
        } else {
          setError("Teacher not found");
        }
      } catch (err) {
        setError("Error fetching teacher data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchTeacher();
    }
  }, [userId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <Typography variant="h6" color="error" align="center">
        {error}
      </Typography>
    );
  }
  const InfoItem = ({ icon: Icon, children }) => (
    <div className="flex items-center gap-2 text- text-gray-800">
      <Icon className="w-5 h-5 text-green-600" />
      {children}
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-8 shadow-lg">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <Avatar
            sx={{
              width: 150,
              height: 150,
              border: "4px solid white",
              boxShadow: 3,
              bgcolor: "primary.main",
              fontSize: 50,
            }}
          >
            {`${teacher.firstName?.charAt(0) ?? ""}${
              teacher.lastName?.charAt(0) ?? ""
            }`}
          </Avatar>
          <div className="text-center md:text-left space-y-2">
            <Typography
              variant="h4"
              component="h1"
              color="textPrimary"
              className="font-bold"
            >
              {teacher.firstName} {teacher.lastName}
            </Typography>
            <Typography variant="h6" color="textSecondary">
              {teacher.degreeLevel}
            </Typography>
            <div className="flex items-center gap-2 justify-center md:justify-start">
              <Building2 className="w-5 h-5 text-gray-600" />
              <span className="text-gray-600 mt-1">{teacher.department}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Contact and Expertise Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="shadow-md hover:shadow-lg transition-shadow bg-slate-50">
          {/* Custom header */}
          <div className="flex items-center gap-2 p-4 border-b border-gray-200">
            <Mail className="w-5 h-5 text-green-800" />
            <Typography variant="h6" className="ml-2 text-lg font-semibold">
              Contact Information
            </Typography>
          </div>
          <CardContent className="space-y-7 ">
            <InfoItem icon={Mail}>{teacher.email}</InfoItem>
            <InfoItem icon={Phone}>{teacher.phoneNumber}</InfoItem>
            <InfoItem icon={MapPin}>{teacher.roomNumber}</InfoItem>
          </CardContent>
        </Card>

        <Card className="shadow-md hover:shadow-lg transition-shadow bg-slate-50">
          {/* Custom header */}
          <div className="flex items-center gap-2 p-4 border-b border-gray-200">
            <Award className="w-5 h-5 text-blue-500" />
            <Typography variant="h6" className="ml-2 text-lg font-semibold">
              Areas of Expertise
            </Typography>
          </div>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {teacher.expertiseAreas.map((skill, index) => (
                <Badge
                  key={skill} // Eğer `skill` string ise, doğrudan `key` olarak kullanılabilir.
                  variant="filled"
                  className={`text-white font-semibold py-2 px-4 rounded-lg shadow-md transform transition-all duration-300 
        ${
          [
            "bg-blue-600 hover:bg-blue-700",
            "bg-green-600 hover:bg-green-700",
            "bg-purple-600 hover:bg-purple-700",
            "bg-yellow-600 hover:bg-yellow-700",
          ][index % 4]
        } hover:scale-105`}
                >
                  {skill}{" "}
                  {/* Eğer `skill` zaten bir string ise, doğrudan yazdır */}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Courses and Office Hours */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="shadow-md hover:shadow-lg transition-shadow bg-slate-50">
          {/* Custom header */}
          <div className="flex items-center gap-2 p-4 border-b border-gray-200">
            <BookOpen className="w-5 h-5 text-blue-800" />
            <Typography variant="h6" className="ml-2 text-lg font-semibold">
              Current Courses
            </Typography>
          </div>
          <CardContent>
            <div className="space-y-3">
              {teacher.courses.length > 0 ? (
                <div className="space-y-3">
                  {teacher.courses.map((course) => (
                    <div
                      key={course.courseCode}
                      className="flex items-start gap-2 p-2 rounded-md hover:bg-gray-200"
                    >
                      <BookOpen className="w-5 h-5 text-blue-500 mt-1" />
                      <span className="text-medium text-gray-600">
                        {course.courseCode} - {course.courseName}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <Typography
                  variant="body2"
                  color="textSecondary"
                  align="center"
                >
                  No courses assigned.
                </Typography>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md hover:shadow-lg transition-shadow bg-slate-50">
          {/* Custom header */}
          <div className="flex items-center gap-2 p-4 border-b border-gray-200">
            <Clock className="w-5 h-5 text-red-800" />
            <Typography variant="h6" className="ml-2 text-lg font-semibold">
              Office Hours
            </Typography>
          </div>
          <CardContent>
            <div className="space-y-3">
              {teacher.officeHours.length > 0 ? (
                <div className="space-y-3">
                  {teacher.officeHours.map((hours) => (
                    <div
                      key={`${hours.day}-${hours.startTime}`}
                      className="flex items-start gap-2 p-2 rounded-md hover:bg-gray-200"
                    >
                      <Calendar className="w-5 h-5 text-red-600 mt-1" />
                      <span className="text-medium text-gray-600 mt-1">
                        {hours.day}: {hours.startTime} - {hours.endTime}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <Typography
                  variant="body2"
                  color="textSecondary"
                  align="center"
                >
                  No office hours set.
                </Typography>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Education Section */}
      <Card className="shadow-md hover:shadow-lg transition-shadow bg-slate-50">
        {/* Custom header */}
        <div className="flex items-center gap-2 p-4 border-b border-gray-200">
          <GraduationCap className="w-5 h-5 text-yellow-800" />
          <Typography variant="h6" className="ml-2 text-lg font-semibold">
            Education
          </Typography>
        </div>
        <CardContent>
          <div className="space-y-3">
            {teacher.schools.map((edu) => (
              <div
                key={`${edu.degree}-${edu.name}`}
                className="flex items-start gap-2 p-2 rounded-md hover:bg-gray-200"
              >
                <Award className="w-5 h-5 text-yellow-700 mt-1" />
                <span className="text-medium text-gray-600">
                  {edu.degree} - {edu.name}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TeacherProfileInterface;
