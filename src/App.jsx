import { useEffect, useState } from 'react';
import { BACKEND_URL, FETCH_INTERVAL } from './constants';
import ChatWindow from './components/ChatWindow';
import InputBox from './components/InputBox';
import Controls from './components/Controls';
import { useAudioQueue } from './hooks/useAudioQueue';

export default function App() {
  const [messages, setMessages] = useState([]);
  const { addToQueue } = useAudioQueue();

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch(BACKEND_URL);
        if (!res.ok) throw new Error('Network response was not ok');
        
        const newMessages = await res.json();
        if (Array.isArray(newMessages)) {
          newMessages.forEach((msg) => {
            if (!messages.some(m => m.text === msg.text)) { // Проверка на дубликаты
              setMessages((prev) => [...prev, msg]);
              if (msg.audioUrl) {
                addToQueue(msg);
              }
            }
          });
        }
      } catch (err) {
        console.error('Failed to fetch messages', err);
      }
    };

    const interval = setInterval(fetchMessages, FETCH_INTERVAL);
    return () => clearInterval(interval);
  }, [messages, addToQueue]);

  return (
    <div className="min-h-screen bg-pink-100 flex justify-center items-start py-12">
      <div className="bg-winbg border-2 border-windark shadow-[inset_1px_1px_#ffffff,inset_-1px_-1px_#808080] p-4 w-[800px] font-win95">
        <div className="bg-winbg border-2 border-windark shadow-[inset_1px_1px_#ffffff,inset_-1px_-1px_#808080] p-1 mb-4 text-center">
          <h1 className="text-xl font-bold">📻 Vaporwave Radio Online</h1>
        </div>
        <ChatWindow messages={messages.slice(-50)} />
        <InputBox onSend={(msg) => setMessages(prev => [...prev, msg])} />
        <Controls />
      </div>
    </div>
  );
}