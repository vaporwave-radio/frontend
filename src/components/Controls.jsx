import { SIGNAL_URL } from '../constants';

export default function Controls() {
  const signal = async (type) => {
    await fetch(SIGNAL_URL, {
      method: 'POST',
      body: JSON.stringify({ type }),
      headers: { 'Content-Type': 'application/json' }
    });
  };

  return (
    <div className="flex justify-center gap-4 mt-4">
      <button className="bg-winbg px-3 py-1 border-2 border-windark shadow-[inset_1px_1px_#ffffff,inset_-1px_-1px_#808080] hover:brightness-95 active:shadow-none" onClick={() => signal('start')}>
        ▶ Start
      </button>
      <button className="bg-winbg px-3 py-1 border-2 border-windark shadow-[inset_1px_1px_#ffffff,inset_-1px_-1px_#808080] hover:brightness-95 active:shadow-none" onClick={() => signal('stop')}>
        ⏹ Stop
      </button>
    </div>
  );
}

