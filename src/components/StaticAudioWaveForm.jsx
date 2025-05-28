"use client";
import { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";
import { useToast } from "./context/ToastContext";

export default function StaticAudioWaveform({
  text,
  isRecording,
  isAudioPlaying,
  setIsAudioPlaying,
}) {
  const { showToast } = useToast();
  const [waveformData, setWaveformData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [playCount, setPlayCount] = useState(0);
  const audioRef = useRef(null);

  // Waveform dummy generation
  useEffect(() => {
    const generateWaveform = () => {
      const points = [];
      for (let i = 0; i < 100; i++) {
        points.push(Math.floor(Math.random() * 40 + 10));
      }
      return points;
    };
    setWaveformData(generateWaveform());
  }, []);

  // Reset on text change
  useEffect(() => {
    setPlayCount(0);
    setIsAudioPlaying(false);
    setCurrentTime(0);
    setDuration(0);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
  }, [text]);

  // Format time
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60) || 0;
    const remainingSeconds = Math.floor(seconds % 60) || 0;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const playAudio = async () => {
    if (!text || playCount >= 2 || isRecording || isAudioPlaying || isLoading)
      return;

    try {
      setIsLoading(true);
      setIsAudioPlaying(true);

      const res = await fetch("http://localhost:4000/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      if (!res.ok) throw new Error("Failed to fetch audio");

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);

      audioRef.current = audio;
      setPlayCount((prev) => prev + 1);

      audio.onloadedmetadata = () => {
        setDuration(audio.duration);
      };

      audio.ontimeupdate = () => {
        setCurrentTime(audio.currentTime);
      };

      audio.onended = () => {
        setIsAudioPlaying(false);
        setIsLoading(false);
      };

      audio.onerror = () => {
        setIsLoading(false);
        setIsAudioPlaying(false);
        showToast("Audio playback error.", "error");
      };

      await audio.play();
      setIsAudioPlaying(true);
    } catch (err) {
      console.error("Audio error:", err);
      setIsLoading(false);
      setIsAudioPlaying(false);
      showToast("Not played.", "error");
    }
  };

  // UI
  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <p className="text-sm text-gray-600 mb-2 text-center">
        You can listen to the question{" "}
        <span className="font-semibold">up to 2 times</span>.
      </p>
      {/* Waveform */}
      <div className="bg-gray-100 w-full h-24 relative rounded-lg overflow-hidden">
        <div className="absolute inset-0 flex items-center gap-[2px] px-2">
          {waveformData.length > 0 ? (
            waveformData.map((height, index) => (
              <div
                key={index}
                className="w-1 bg-blue-500 rounded-full"
                style={{
                  height: `${height}px`,
                  opacity: "0.7",
                }}
              />
            ))
          ) : (
            <div className="text-gray-400 text-sm">Loading waveform...</div>
          )}
        </div>
      </div>

      {/* Time display */}
      <div className="flex justify-end mt-2">
        <span className="text-sm text-gray-600">
          {formatTime(currentTime)} / {formatTime(duration)}
        </span>
      </div>

      {/* Play Button */}
      <div className="flex justify-center my-6">
        <button
          onClick={playAudio}
          disabled={
            isLoading || isAudioPlaying || isRecording || playCount >= 2
          }
          className={`px-6 py-2 rounded-md flex items-center gap-2 ${
            isLoading || isAudioPlaying || isRecording || playCount >= 2
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600 text-white"
          }`}
        >
          <Play className="w-4 h-4" />
          {isLoading
            ? "Playing..."
            : isAudioPlaying
            ? "Playing..."
            : playCount >= 2
            ? "Limit Reached"
            : "Play Audio"}
        </button>
      </div>
    </div>
  );
}
