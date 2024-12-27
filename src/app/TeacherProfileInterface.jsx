import React from "react";
import { Card, CardContent, Typography, Badge } from "@mui/material";
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

const TeacherProfileInterface = () => {
  const teacher = {
    name: "Dr. Sarah Johnson",
    image: "/images/teacher.jpeg",
    title: "Senior English Professor",
    department: "Department of English",
    email: "sarah.johnson@university.edu",
    phone: "(555) 123-4567",
    office: "Building A, Room 204",
    expertise: [
      "Language Acquisition",
      "Translation",
      "Phonetics",
      "Advanced Linguistic Analysis",
      "Pronunciation",
      "Teaching Methodologies",
    ],
    education: [
      "Ph.D. in English Linguistics, Stanford University",
      "M.A. in Applied Linguistics, University of Cambridge",
      "B.A. in English Literature, UC Berkeley",
    ],
    officeHours: [
      "Monday: 10:00 AM - 12:00 PM",
      "Tuesday: 2:00 PM - 4:00 PM",
      "Thursday: 1:00 PM - 3:00 PM",
    ],
    currentCourses: [
      "ENG 101: Introduction to English Literature",
      "ENG 201: Advanced English Composition",
      "ENG 301: Linguistic Theories",
      "ENG 401: Teaching English as a Second Language",
    ],
  };

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
          <Avatar className="w-32 h-32 border-4 border-white shadow-lg">
            <img src={teacher.image} alt={teacher.name} />
          </Avatar>
          <div className="text-center md:text-left space-y-2">
            <Typography
              variant="h4"
              component="h1"
              color="textPrimary"
              className="font-bold"
            >
              {teacher.name}
            </Typography>
            <Typography variant="h6" color="textSecondary">
              {teacher.title}
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
            <InfoItem icon={Phone}>{teacher.phone}</InfoItem>
            <InfoItem icon={MapPin}>{teacher.office}</InfoItem>
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
              {teacher.expertise.map((skill, index) => (
                <Badge
                  key={skill}
                  variant="filled"
                  className={`text-white font-semibold py-2 px-4 rounded-lg shadow-md transform transition-all duration-300 
            ${
              index % 4 === 0
                ? "bg-blue-600 hover:bg-blue-700"
                : index % 4 === 1
                ? "bg-green-600 hover:bg-green-700"
                : index % 4 === 2
                ? "bg-purple-600 hover:bg-purple-700"
                : "bg-yellow-600 hover:bg-yellow-700"
            } 
            hover:scale-105`}
                >
                  {skill}
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
              {teacher.currentCourses.map((course) => (
                <div
                  key={course}
                  className="flex items-start gap-2 p-2 rounded-md hover:bg-gray-200"
                >
                  <BookOpen className="w-5 h-5 text-blue-500 mt-1" />
                  <span className="text-medium text-gray-600">{course}</span>
                </div>
              ))}
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
              {teacher.officeHours.map((hours) => (
                <div
                  key={hours}
                  className="flex items-start gap-2 p-2 rounded-md hover:bg-gray-200"
                >
                  <Calendar className="w-5 h-5 text-red-600 mt-1" />
                  <span className="text-medium text-gray-600 mt-1">
                    {hours}
                  </span>
                </div>
              ))}
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
            {teacher.education.map((edu) => (
              <div
                key={edu}
                className="flex items-start gap-2 p-2 rounded-md hover:bg-gray-200"
              >
                <Award className="w-5 h-5 text-yellow-700 mt-1" />
                <span className="text-medium text-gray-600">{edu}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TeacherProfileInterface;
