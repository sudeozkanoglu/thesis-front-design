// SES KAYDI İÇİN KULLANILABİLİR
// // WaveformPlayer.jsx
// "use client";
// import React, { useEffect, useRef, useState } from "react";
// import WaveSurfer from "wavesurfer.js";

// const WaveformPlayer = ({ audioUrl }) => {
//   const waveformRef = useRef(null);      // Dalga formu DOM referansı
//   const waveSurferRef = useRef(null);    // WaveSurfer örneği
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [duration, setDuration] = useState(0);
//   const [currentTime, setCurrentTime] = useState(0);

//   // WaveSurfer kurulumunu ve olay dinleyicilerini ayarla
//   useEffect(() => {
//     if (!waveformRef.current) return;

//     // WaveSurfer ayarları
//     waveSurferRef.current = WaveSurfer.create({
//       container: waveformRef.current,
//       waveColor: "#ddd",
//       progressColor: "#3b82f6", // Tailwind'de 'bg-blue-500' -> #3b82f6
//       cursorColor: "#3b82f6",
//       barWidth: 2,
//       responsive: true,
//       height: 80,
//     });

//     waveSurferRef.current.load(audioUrl);

//     // Ses dosyası hazır olduğunda toplam süreyi al
//     waveSurferRef.current.on("ready", () => {
//       setDuration(waveSurferRef.current.getDuration());
//     });

//     // Oynatma ilerledikçe güncel süreyi al
//     waveSurferRef.current.on("audioprocess", () => {
//       if (!waveSurferRef.current) return;
//       setCurrentTime(waveSurferRef.current.getCurrentTime());
//     });

//     // Bileşen unmount olduğunda WaveSurfer örneğini temizle
//     return () => {
//       waveSurferRef.current.destroy();
//     };
//   }, [audioUrl]);

//   const formatTime = (timeInSeconds) => {
//     const minutes = Math.floor(timeInSeconds / 60);
//     const seconds = Math.floor(timeInSeconds % 60);
//     return `${minutes}:${seconds.toString().padStart(2, "0")}`;
//   };

//   const togglePlay = () => {
//     if (!waveSurferRef.current) return;
//     waveSurferRef.current.playPause();
//     setIsPlaying((prev) => !prev);
//   };

//   return (
//     <div>
//       <div ref={waveformRef} className="w-full mb-2" />
//       <div className="flex items-center justify-between">
//         <button
//           onClick={togglePlay}
//           className="px-3 py-1 bg-blue-500 rounded text-white hover:bg-blue-600"
//         >
//           {isPlaying ? "Pause" : "Play"}
//         </button>
//         <span className="text-sm text-slate-700">
//           {formatTime(currentTime)} / {formatTime(duration)}
//         </span>
//       </div>
//     </div>
//   );
// };

// export default WaveformPlayer;
