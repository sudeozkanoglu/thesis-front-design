'use client';

import { useState } from 'react';

export default function TextToSpeechButton() {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);

    try {
      const response = await fetch('http://localhost:4000/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: 'What is the capital of France' }),
      });

      if (!response.ok) {
        throw new Error('Ses alınamadı');
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      const audio = new Audio(url);
      audio.play();
    } catch (err) {
      console.error(err);
      alert('Ses oynatılamadı.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      disabled={loading}
    >
      {loading ? 'Yükleniyor...' : 'Metni Seslendir'}
    </button>
  );
}