"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Trash2,
  Plus,
  CheckCheck,
  Clock,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import {
  Card,
  CardContent,
  Button,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useToast } from "@/components/context/ToastContext";

const QuestionBuilder = ({ examId }) => {
  const router = useRouter();
  const { showToast } = useToast();
  const [examTime, setExamTime] = useState({ hours: 0, minutes: 0 });
  const [loading, setLoading] = useState(false);
  const [examDate, setExamDate] = useState(null);
  const [questions, setQuestions] = useState([
    { text: "", answer: "", language: "tr", showAnswer: false },
  ]);

  useEffect(() => {
    const fetchExam = async () => {
      try {
        const res = await fetch(`http://localhost:4000/api/exams/${examId}`);
        const data = await res.json();

        if (data.success && data.exam) {
          const qList = data.exam.questions.map((q) => ({
            text: q.questionText,
            answer: q.correctAnswer,
            showAnswer: true,
            language: q.language || "tr",
            _id: q._id,
          }));
          setQuestions(
            qList.length > 0
              ? qList
              : [{ text: "", answer: "", showAnswer: false }]
          );
          if (data.exam.examDate) {
            setExamDate(new Date(data.exam.examDate));
          }
          if (data.exam.duration) {
            setExamTime({
              hours: Math.floor(data.exam.duration / 60),
              minutes: data.exam.duration % 60,
            });
          }
        }
      } catch (error) {
        console.error("Error loading exam:", error);
        showToast("Failed to load exam", "error");
      }
    };

    if (examId) fetchExam();
  }, [examId, showToast]);

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { text: "", answer: "", language: "tr", showAnswer: false },
    ]);
  };

  const removeQuestion = (index) => {
    const updated = questions.filter((_, i) => i !== index);
    setQuestions(updated);
  };

  const updateQuestion = (index, key, value) => {
    const updated = [...questions];
    updated[index][key] = value;
    setQuestions(updated);
  };

  const toggleAnswer = (index) => {
    const updated = [...questions];
    updated[index].showAnswer = !updated[index].showAnswer;
    setQuestions(updated);
  };

  const handleSubmit = async () => {
    if (!examId) {
      showToast("Exam ID is required", "error");
      return;
    }

    if (!examDate || (examTime.hours === 0 && examTime.minutes === 0)) {
      showToast("Please select an exam date and duration.", "error");
      return;
    }

    const payload = questions.map((q) => ({
      questionText: q.text,
      correctAnswer: q.answer,
      explanation: "",
      language: q.language || "tr",
    }));

    if (payload.some((q) => !q.questionText || !q.correctAnswer)) {
      showToast("Please fill in all question texts and answers.", "error");
      return;
    }

    try {
      setLoading(true);

      const res1 = await fetch("http://localhost:4000/api/questions/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ exam: examId, questions: payload }),
      });

      const result1 = await res1.json();
      if (!result1.success) {
        showToast("Failed to add questions: " + result1.message, "error");
        return;
      }

      showToast("Questions added successfully!", "success");

      const questionIds = result1.questions.map((q) => q._id);

      const res2 = await fetch(`http://localhost:4000/api/exams/${examId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          examDate,
          duration: examTime.hours * 60 + examTime.minutes,
          questions: questionIds,
        }),
      });

      const result2 = await res2.json();
      if (!result2.success) {
        showToast("Failed to update exam: " + result2.message, "error");
        return;
      }

      showToast("Exam updated successfully!", "success");

      router.push("/teacher/teacherExam");
    } catch (err) {
      console.error("Submission failed:", err);
      showToast("An unexpected error occurred.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div className="max-w-3xl mx-auto p-6 space-y-6">
        <h1 className="text-2xl font-bold mb-6 text-black">
          Create Exam Questions
        </h1>

        {/* Time and Date */}
        <Card className="bg-slate-50 shadow-lg">
          <CardContent className="p-6 flex items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <Clock className="h-5 w-5 text-black" />
              <TextField
                label="Minutes"
                type="number"
                value={examTime.minutes}
                onChange={(e) =>
                  setExamTime({ ...examTime, minutes: Number(e.target.value) })
                }
              />
            </div>
            <div>
              <DatePicker
                label="Exam Date"
                value={examDate}
                onChange={(newDate) => setExamDate(newDate)}
                renderInput={(params) => <TextField {...params} />}
              />
            </div>
          </CardContent>
        </Card>

        {/* Question Cards */}
        {questions.map((q, idx) => (
          <Card key={idx} className="bg-slate-50 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">
                  {idx + 1}
                </div>
                <div className="flex-1">
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    placeholder="Enter the question"
                    value={q.text}
                    onChange={(e) =>
                      updateQuestion(idx, "text", e.target.value)
                    }
                  />
                  <FormControl
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    className="mt-4"
                  >
                    <InputLabel id={`language-label-${idx}`}>
                      Student Response Language
                    </InputLabel>
                    <Select
                      labelId={`language-label-${idx}`}
                      id={`language-select-${idx}`}
                      label="Student Response Language"
                      value={q.language || "tr"}
                      onChange={(e) =>
                        updateQuestion(idx, "language", e.target.value)
                      }
                    >
                      <MenuItem value="tr">Turkish</MenuItem>
                      <MenuItem value="en">English</MenuItem>
                      <MenuItem value="de">German</MenuItem>
                    </Select>
                  </FormControl>
                  <Button
                    className="mt-2 text-blue-600 hover:underline"
                    onClick={() => toggleAnswer(idx)}
                  >
                    {q.showAnswer ? (
                      <>
                        <ChevronUp className="mr-2" /> Hide Answer
                      </>
                    ) : (
                      <>
                        <ChevronDown className="mr-2" /> Add Answer
                      </>
                    )}
                  </Button>
                </div>
                {questions.length > 1 && (
                  <Button onClick={() => removeQuestion(idx)} className="mt-10">
                    <Trash2 className="text-red-500" />
                  </Button>
                )}
              </div>
              {q.showAnswer && (
                <div className="mt-4 pl-14">
                  <TextField
                    fullWidth
                    multiline
                    rows={2}
                    placeholder="Type the answer here..."
                    value={q.answer}
                    onChange={(e) =>
                      updateQuestion(idx, "answer", e.target.value)
                    }
                  />
                </div>
              )}
            </CardContent>
          </Card>
        ))}

        {/* Actions */}
        <div className="flex justify-between items-center pt-4">
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => router.back()}
            className="flex items-center gap-2"
          >
            ← Back
          </Button>

          <div className="flex gap-2">
            <Button
              onClick={addQuestion}
              variant="contained"
              color="primary"
              className="flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Add Question
            </Button>

            <Button
              onClick={handleSubmit}
              variant="contained"
              color="success"
              className="flex items-center gap-2"
              disabled={loading}
            >
              <CheckCheck className="h-4 w-4" />
              {loading ? "Submitting..." : "Complete Adding Questions"}
            </Button>
          </div>
        </div>
      </div>
    </LocalizationProvider>
  );
};

export default QuestionBuilder;
