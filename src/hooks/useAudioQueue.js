import { useState, useEffect, useRef } from 'react';

export function useAudioQueue() {
  const [queue, setQueue] = useState([]);
  const audioRef = useRef(null);
  const isPlayingRef = useRef(false);

  useEffect(() => {
    audioRef.current = new Audio();
    
    const handleEnded = () => {
      isPlayingRef.current = false;
      playNext();
    };

    audioRef.current.addEventListener('ended', handleEnded);
    
    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('ended', handleEnded);
        audioRef.current.pause();
      }
    };
  }, []);

  const addToQueue = (item) => {
    setQueue((prev) => [...prev, item]);
  };

  const playNext = () => {
    if (queue.length === 0 || isPlayingRef.current || !audioRef.current) return;

    const next = queue[0];
    try {
      const audioUrl = next.audioUrl + (next.audioUrl.includes('?') ? '&' : '?') + `t=${Date.now()}`;
      audioRef.current.src = audioUrl;
      audioRef.current.play()
        .then(() => {
          isPlayingRef.current = true;
          setQueue((prev) => prev.slice(1));
        })
        .catch(error => {
          console.error('Audio playback error:', error);
          isPlayingRef.current = false;
        });
    } catch (error) {
      console.error('Error setting audio source:', error);
    }
  };

  useEffect(() => {
    playNext();
  }, [queue]);

  return { addToQueue };
}