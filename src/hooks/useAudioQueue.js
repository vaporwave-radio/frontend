import { useState, useEffect, useRef } from 'react';

export function useAudioQueue() {
  const [queue, setQueue] = useState([]);
  const audioRef = useRef(new Audio());
  const isPlayingRef = useRef(false);

  useEffect(() => {
    audioRef.current.onended = () => {
      isPlayingRef.current = false;
      playNext();
    };
  }, []);

  const addToQueue = (item) => {
    setQueue((prev) => [...prev, item]);
  };

  const playNext = () => {
    if (queue.length === 0 || isPlayingRef.current) return;

    const next = queue[0];
    audioRef.current.src = next.audioUrl;
    audioRef.current.play();
    isPlayingRef.current = true;

    setQueue((prev) => prev.slice(1));
  };

  useEffect(() => {
    playNext();
  }, [queue]);

  return { addToQueue };
}

