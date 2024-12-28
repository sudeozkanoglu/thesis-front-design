"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Clock, ChevronLeft, ChevronRight, Check, Square, Video} from 'lucide-react';
import StaticAudioWaveform from "@/app/StaticAudioWaveform";

const AudioExamInterface = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeLeft, setTimeLeft] = useState(3600);
  const [isRecording, setIsRecording] = useState(false);
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [recordings, setRecordings] = useState({});

  // Örnek sorular (artık audioUrl vs. önemsiz, çünkü statik gösteriyoruz)
  const questions = [
    { id: 1, type: "conversation" },
    { id: 2, type: "music" },
    { id: 3, type: "radio"},
    { id: 4, type: "conversation" },
    { id: 5, type: "music" }
  ];
  
  // Added the missing formatTime function
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      videoRef.current.srcObject = stream;
      mediaRecorderRef.current = new MediaRecorder(stream);
      
      let chunks = [];
      mediaRecorderRef.current.ondataavailable = (e) => chunks.push(e.data);
      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/webm' });
        setRecordings({
          ...recordings,
          [currentQuestion]: URL.createObjectURL(blob)
        });
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (err) {
      console.error("Error accessing media devices:", err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
      videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      setIsRecording(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Exam Header */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-slate-800">English for Tourism and Hospitality - Final Exam</h1>
          <div className="flex items-center gap-2 text-slate-600">
            <Clock className="w-5 h-5" />
            <span className="font-mono">{formatTime(timeLeft)}</span>
          </div>
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="mb-6">
          <span className="text-sm text-slate-500">
            Question {currentQuestion + 1} of {questions.length}
          </span>

          {/* Audio Player */}
          <div className="my-6">
            <StaticAudioWaveform />
          </div>
    
          {/* Video Recording Section */}
          <div className="mt-8">
            <div className="aspect-video bg-slate-100 rounded-lg overflow-hidden mb-4 relative">
              {!isRecording && !recordings[currentQuestion] && (
                <img 
                  src="/images/student2.png" 
                  alt="Student placeholder" 
                  className="w-full h-full object-cover"
                />
              )}
              <video 
                ref={videoRef} 
                className="w-full h-full object-cover"
                autoPlay 
                muted 
                playsInline
              />
            </div>
            
            <div className="flex justify-center gap-4">
              {!isRecording ? (
                <button
                  onClick={startRecording}
                  className="flex items-center gap-2 px-6 py-3 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  <Video className="w-5 h-5" />
                  Start Recording
                </button>
              ) : (
                <button
                  onClick={stopRecording}
                  className="flex items-center gap-2 px-6 py-3 bg-slate-500 text-white rounded-md hover:bg-slate-600"
                >
                  <Square className="w-5 h-5" />
                  Stop Recording
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-6">
          <button
            onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
            disabled={currentQuestion === 0}
            className="flex items-center gap-2 px-4 py-2 rounded-md bg-blue-800 hover:bg-blue-600 "
          >
            <ChevronLeft className="w-5 h-5" />
            Previous
          </button>

          {currentQuestion === questions.length - 1 ? (
            <button className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
              <Check className="w-5 h-5" />
              Submit Exam
            </button>
          ) : (
            <button
              onClick={() => setCurrentQuestion(prev => Math.min(questions.length - 1, prev + 1))}
              className="flex items-center gap-2 px-4 py-2 rounded-md bg-blue-800 hover:bg-blue-600"
            >
              Next
              <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AudioExamInterface;