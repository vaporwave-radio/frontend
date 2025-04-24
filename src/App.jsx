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
    // 1. Сначала инициализируем диалог
    const initDialog = async () => {
      try {
        await fetch('http://localhost:5000/signal', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ type: 'start' })
        });
        
        // 2. После успешной инициализации начинаем опрос сообщений
        const pollMessages = async () => {
          try {
            const res = await fetch('http://localhost:5000/messages');
            const data = await res.json();
            setMessages(prev => [...prev, ...data]);
          } catch (err) {
            console.error('Polling error:', err);
          }
        };
        
        const interval = setInterval(pollMessages, 3000);
        return () => clearInterval(interval);
        
      } catch (err) {
        console.error('Init failed:', err);
      }
    };
  
    initDialog();
  }, []);

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