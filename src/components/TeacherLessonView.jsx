import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Badge,
  Button,
  CircularProgress,
  Typography,
  Divider,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import {
  CheckCircle as CheckCircle2,
  Cancel as XCircle,
  Add as Plus,
  BarChart as BarChart3,
  AccessTime as Clock,
  EmojiEvents as Award,
  Description as FileText,
} from "@mui/icons-material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useRouter } from "next/navigation";
import ExamCreationModal from "./ExamCreationModal";

const TeacherLessonView = ({ courseId, teacherId }) => {
  const [lessonContent, setLessonContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!courseId) return;
    fetchCourseAndExams();
  }, [courseId]);

  const fetchCourseAndExams = async () => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/courses/${courseId}`
      );
      const data = await response.json();

      if (data.success) {
        const examsWithQuestions = await Promise.all(
          data.course.exams.map(async (exam) => {
            const examResponse = await fetch(
              `http://localhost:4000/api/exams/${exam._id}`
            );
            const examData = await examResponse.json();
            return { ...exam, questions: examData.exam?.questions || [] };
          })
        );
        setLessonContent({
          title: data.course.courseName,
          description: data.course.description,
          totalExams: data.course.exams.length,
          completedExams: data.course.exams.filter(
            (exam) => exam.status === "completed"
          ).length,
          exams: examsWithQuestions,
        });
      }
    } catch (error) {
      console.error("Error fetching course and exams:", error);
    } finally {
      setLoading(false);
    }
  };

  const calculateParticipationRate = (studentResults) => {
    if (!studentResults) return "No participants";
    const totalStudents = studentResults.reduce(
      (sum, group) => sum + group.count,
      0
    );
    return `${totalStudents} students`;
  };

  const ExamStatistics = ({ exam }) => {
    if (exam.status !== "completed") return null;

    const highestScoreGroup = exam.studentResults?.reduce((prev, current) =>
      prev.count > current.count ? prev : current
    );

    const lowestScoreGroup = exam.studentResults?.reduce((prev, current) =>
      prev.count < current.count ? prev : current
    );

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <StatisticItem
          icon={<Award />}
          label="Average Score"
          value={`${exam.averageScore || 0}%`}
        />
        <StatisticItem
          icon={<FileText />}
          label="Success Rate"
          value={`${exam.successRate || 0}%`}
        />
        <StatisticItem
          icon={<Clock />}
          label="Avg. Time Spent"
          value={exam.timeSpent ?? "N/A"}
        />
        <StatisticItem
          icon={<BarChart3 />}
          label="Participation"
          value={calculateParticipationRate(exam.studentResults)}
        />
        <StatisticItem
          icon={<XCircle />}
          label="Lowest Score"
          value={lowestScoreGroup?.name ?? "N/A"}
        />
        <StatisticItem
          icon={<CheckCircle2 />}
          label="Highest Score"
          value={highestScoreGroup?.name ?? "N/A"}
        />
      </div>
    );
  };

  const StatisticItem = ({ icon, label, value }) => (
    <div className="flex items-center gap-2 bg-blue-50 p-2 rounded-lg">
      {icon}
      <div>
        <p className="text-sm text-gray-600">{label}</p>
        <p className="text-lg font-semibold">{value}</p>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <CircularProgress />
      </div>
    );
  }

  if (!lessonContent) {
    return (
      <p className="text-center text-red-500">Failed to load course data.</p>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-4 flex justify-start-4">
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => router.back()}
          className="flex items-center gap-2"
        >
          ← Back
        </Button>
      </div>
      <Card className="mb-8 shadow-md hover:shadow-lg transition-shadow bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardContent className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-3xl font-bold mb-2">{lessonContent.title}</h2>
              <p className="text-gray-600 text-lg">
                {lessonContent.description}
              </p>
            </div>
            <Badge className="text-blue-700 text-lg px-4 py-2">
              {lessonContent.completedExams}/{lessonContent.totalExams}{" "}
              Completed
            </Badge>
          </div>
          <progress
            value={
              (lessonContent.completedExams / lessonContent.totalExams) * 100
            }
            className="w-full h-3 mt-4"
          />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lessonContent.exams.map((exam) => (
          <Card
            key={exam._id}
            className="shadow-md hover:shadow-lg transition-shadow bg-slate-50"
          >
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  {exam.status === "completed" ? (
                    <CheckCircle2 className="text-green-500" />
                  ) : (
                    <XCircle className="text-gray-400" />
                  )}
                  <div>
                    <h3 className="font-semibold text-lg">{exam.examName}</h3>
                    <p className="text-sm text-gray-600">
                      {exam.status === "completed"
                        ? `Completed on ${new Date(
                            exam.examDate
                          ).toLocaleDateString()}`
                        : `Due by ${new Date(
                            exam.dueDate
                          ).toLocaleDateString()}`}
                    </p>
                  </div>
                </div>
                {exam.questions && exam.questions.length > 0 ? (
                  <Button
                    size="small"
                    className="bg-green-500 text-white hover:bg-green-600"
                    onClick={() => router.push(`/createQuestions/${exam._id}`)}
                  >
                    <VisibilityIcon className="mr-1 w-8 h-8" />
                    View Questions
                  </Button>
                ) : (
                  <Button
                    size="small"
                    className="bg-blue-500 text-white hover:bg-blue-600"
                    onClick={() => router.push(`/createQuestions/${exam._id}`)}
                  >
                    <Plus className="mr-1" />
                    Add Questions
                  </Button>
                )}
              </div>
              <Divider className="my-3" />
              <ExamStatistics exam={exam} />
            </CardContent>
          </Card>
        ))}

        {/* Add New Exam Card - Matches other cards */}
        <Card className="shadow-md hover:shadow-lg transition-shadow bg-slate-50">
          <CardContent className="flex flex-col justify-center items-center text-center p-6">
            <AddCircleOutlineIcon
              className="text-blue-500"
              style={{ fontSize: 50 }}
            />
            <Typography variant="h6" className="text-gray-800 mt-4">
              Create New Exam
            </Typography>
            <Button
              variant="contained"
              size="small"
              color="primary"
              className="w-full mt-4 bg-gradient-to-r from-green-500 to-green-700 text-white"
              onClick={() => setOpenModal(true)}
            >
              Add Exam
            </Button>
          </CardContent>
        </Card>

        {/* Modal */}
        <ExamCreationModal
          open={openModal}
          onClose={() => setOpenModal(false)}
          courseId={courseId}
          teacherId={teacherId}
          onExamCreated={fetchCourseAndExams}
        />
      </div>
    </div>
  );
};

export default TeacherLessonView;
