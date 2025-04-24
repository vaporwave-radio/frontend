export default function ChatWindow({ messages }) {
  return (
    <div className="bg-white border-2 border-windark shadow-[inset_1px_1px_#ffffff,inset_-1px_-1px_#808080] p-2 h-64 overflow-y-scroll mb-2">
      {messages.map((msg, idx) => (
        <div key={idx} className="mb-2">
          <strong>{msg.sender}:</strong> {msg.text}
          {msg.audioUrl && (
            <div className="mt-1">
              <audio 
                controls 
                src={msg.audioUrl} 
                className="w-full"
                onPlay={(e) => e.target.volume = 0.5}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}