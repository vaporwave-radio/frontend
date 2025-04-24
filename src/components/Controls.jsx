export default function Controls({ onSignal }) {
  return (
    <div className="flex justify-center gap-4 mt-4">
      <button 
        onClick={() => onSignal('start')}
        className="bg-winbg px-3 py-1 border-2 border-windark shadow-[inset_1px_1px_#ffffff,inset_-1px_-1px_#808080] hover:brightness-95 active:shadow-none"
      >
        ▶ Start
      </button>
      <button 
        onClick={() => onSignal('stop')}
        className="bg-winbg px-3 py-1 border-2 border-windark shadow-[inset_1px_1px_#ffffff,inset_-1px_-1px_#808080] hover:brightness-95 active:shadow-none"
      >
        ⏹ Stop
      </button>
    </div>
  );
}