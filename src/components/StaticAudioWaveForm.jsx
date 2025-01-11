"use client";
import React, { useEffect, useState } from "react";
import { Play } from "lucide-react";

export default function StaticAudioWaveform() {
  const [waveformData, setWaveformData] = useState([]);

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
        <span className="text-sm text-gray-600">0:00 / 3:45</span>
      </div>

      {/* Ortalanmış Buton */}
      <div className="flex justify-center my-6">
        <button className="px-6 py-2 bg-blue-500 rounded-md hover:bg-blue-600 text-white flex items-center gap-2">
          <Play className="w-4 h-4" />
          Play Audio
        </button>
      </div>
    </div>
  );
}
