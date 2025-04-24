import { useState } from 'react';
import { SEND_TOPIC_URL } from '../constants';

export default function InputBox({ onSend }) {
  const [text, setText] = useState('');

  const handleSend = async () => {
    if (!text.trim()) return;
    
    try {
      await fetch('http://localhost:5000/send-topic', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: text })
      });
      onSend(text);
      setText('');
    } catch (err) {
      console.error('Send failed:', err);
    }
  };

  return (
    <div className="flex gap-2">
      <input
        type="text"
        className="flex-grow border border-gray-400 p-1"
        placeholder="Type a new topic..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={handleSend} className="bg-winbg px-3 py-1 border-2 border-windark shadow-[inset_1px_1px_#ffffff,inset_-1px_-1px_#808080] hover:brightness-95 active:shadow-none">
        Send
      </button>
    </div>
  );
}

