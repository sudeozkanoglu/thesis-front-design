"use client";
import React, { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";

export default function StaticAudioWaveform({ text }) {
  const [waveformData, setWaveformData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef(null);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

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

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60) || 0;
    const remainingSeconds = Math.floor(seconds % 60) || 0;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const playAudio = async () => {
    if (!text || text.trim().length === 0) return;

    try {
      setIsLoading(true);

      const res = await fetch("http://localhost:4000/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      if (!res.ok) throw new Error("Ses alınamadı");

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      audioRef.current = new Audio(url);
      audioRef.current.play();

      audioRef.current.onloadedmetadata = () => {
        setDuration(audioRef.current.duration);
      };

      audioRef.current.ontimeupdate = () => {
        setCurrentTime(audioRef.current.currentTime);
      };

      audioRef.current.onended = () => {
        setIsLoading(false);
      };
    } catch (err) {
      console.error("Ses çalınamadı:", err);
      setIsLoading(false);
      alert("Ses oynatılamadı.");
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      {/* Ses Dalgaları Kutusu */}
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

      {/* Sağa Hizalı Süre Bilgisi */}
      <div className="flex justify-end mt-2">
        <span className="text-sm text-gray-600">
          {formatTime(currentTime)} / {formatTime(duration)}
        </span>
      </div>

      {/* Ortalanmış Buton */}
      <div className="flex justify-center my-6">
        <button
          onClick={playAudio}
          disabled={isLoading}
          className={`px-6 py-2 rounded-md flex items-center gap-2 ${
            isLoading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600 text-white"
          }`}
        >
          <Play className="w-4 h-4" />
          {isLoading ? "Loading..." : "Play Audio"}
        </button>
      </div>
    </div>
  );
}
