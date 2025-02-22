"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Trash2,
  Plus,
  CheckCheck,
  Clock,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Card, CardContent, Button, TextField } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

const QuestionBuilder = ({ examId }) => {
  const router = useRouter();
  const [examTime, setExamTime] = useState({ hours: 0, minutes: 0 });
  const [loading, setLoading] = useState(false);
  const [examDate, setExamDate] = useState(null);
  const [questions, setQuestions] = useState([
    { text: "", answer: "", showAnswer: false },
  ]);

  const addQuestion = () => {
    setQuestions([...questions, { text: "", answer: "", showAnswer: false }]);
  };

  const removeQuestion = (index) => {
    const newQuestions = questions.filter((_, i) => i !== index);
    setQuestions(newQuestions);
  };

  const updateQuestion = (index, key, value) => {
    const newQuestions = [...questions];
    newQuestions[index][key] = value;
    setQuestions(newQuestions);
  };

  const toggleAnswer = (index) => {
    const newQuestions = [...questions];
    newQuestions[index].showAnswer = !newQuestions[index].showAnswer;
    setQuestions(newQuestions);
  };

  const handleSubmit = async () => {
    if (!examId) {
      alert("Exam ID is required");
      return;
    }

    if (!examDate || (examTime.hours === 0 && examTime.minutes === 0)) {
      alert("Exam date and duration are required.");
      return;
    }

    const questionData = questions.map((item) => ({
      questionText: item.text,
      correctAnswer: item.answer,
      explanation: "",
    }));

    if (questionData.some((q) => !q.questionText || !q.correctAnswer)) {
      alert("All questions must have text and an answer.");
      return;
    }

    try {
      setLoading(true);

      // Step 1: Add questions to the database
      const questionResponse = await fetch(
        "http://localhost:4000/api/questions/add",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            exam: examId,
            questions: questionData,
          }),
        }
      );

      const questionResult = await questionResponse.json();

      if (!questionResult.success) {
        alert(`Error adding questions: ${questionResult.message}`);
        return;
      }

      const addedQuestionIds = questionResult.questions.map((q) => q._id);

      // Step 2: Update the exam with the new date, duration, and question IDs
      const examUpdateResponse = await fetch(
        `http://localhost:4000/api/exams/${examId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            examDate: examDate,
            duration: examTime.hours * 60 + examTime.minutes, // Convert to total minutes
            questions: addedQuestionIds,
          }),
        }
      );

      const examUpdateResult = await examUpdateResponse.json();

      if (examUpdateResult.success) {
        alert("Exam and questions updated successfully.");
        router.push(`/lessonView/${examId}`);
      } else {
        alert(`Error updating exam: ${examUpdateResult.message}`);
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      alert("An error occurred while submitting.");
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

        <Card className="bg-slate-50 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center gap-6 justify-center">
              {/* Exam Time */}
              <div className="flex gap-4 items-center">
                <Clock className="h-5 w-5 text-black" />
                <TextField
                  id="outlined-number"
                  label="Minutes"
                  type="number"
                  value={examTime.minutes}
                  onChange={(e) =>
                    setExamTime({
                      ...examTime,
                      minutes: Number(e.target.value),
                    })
                  }
                  inputProps={{ min: 0 }}
                />
              </div>

              {/* Exam Date */}
              <div className="flex gap-4 items-center">
                <DatePicker
                  label="Exam Date"
                  value={examDate}
                  onChange={(newDate) => setExamDate(newDate)}
                  renderInput={(params) => <TextField {...params} />}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {questions.map((item, index) => (
          <Card key={index} className="bg-slate-50 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-start gap-4 ">
                <span className="flex items-center justify-center w-10 h-10 mt-10 rounded-full bg-blue-100 text-blue-600 font-semibold">
                  {index + 1}
                </span>
                <div className="flex-1">
                  <TextField
                    value={item.text}
                    onChange={(e) =>
                      updateQuestion(index, "text", e.target.value)
                    }
                    multiline
                    rows={4}
                    fullWidth
                    placeholder="Add Question"
                  />
                  <Button
                    variant="ghost"
                    onClick={() => toggleAnswer(index)}
                    className="mt-2 flex items-center gap-2 text-blue-600 hover:text-blue-800"
                  >
                    {item.showAnswer ? (
                      <ChevronUp className="mr-2" />
                    ) : (
                      <ChevronDown className="mr-2" />
                    )}
                    {item.showAnswer ? "Hide Answer" : "Add Answer"}
                  </Button>
                </div>
                {questions.length > 1 && (
                  <Button
                    variant="ghost"
                    size="small"
                    onClick={() => removeQuestion(index)}
                  >
                    <Trash2 className="h-5 w-5 text-red-500 mt-12" />
                  </Button>
                )}
              </div>
              {item.showAnswer && (
                <div className="mt-4">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-600 font-semibold">
                      A
                    </span>
                    <TextField
                      value={item.answer}
                      onChange={(e) =>
                        updateQuestion(index, "answer", e.target.value)
                      }
                      placeholder="Type the answer here..."
                      multiline
                      rows={3}
                      fullWidth
                      variant="outlined"
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}

        <div className="flex justify-between pt-4">
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
    </LocalizationProvider>
  );
};

export default QuestionBuilder;
