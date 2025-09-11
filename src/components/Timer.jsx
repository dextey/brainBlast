import { useEffect } from "react";

export default function Timer({ timeLeft, setTimeLeft, onTimeUp }) {
  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp();
      return;
    }
    const timer = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, onTimeUp, setTimeLeft]);

  return (
    <div className="text-right text-red-600 font-bold mb-4">
      Time Left: {timeLeft}s
    </div>
  );
}
