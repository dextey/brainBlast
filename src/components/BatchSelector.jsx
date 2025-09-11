import { useState, useEffect } from "react";

const batches = Array.from({ length: 6 }, (_, i) => i + 1);

export default function BatchSelector({ onSelectBatch }) {
  const [progress, setProgress] = useState({});

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("examProgress") || "{}");
    setProgress(saved);
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">📦 Select a Question Set</h1>

      <div className="flex flex-col gap-3">
        {batches.map((num) => {
          const batchKey = `batch-${num}`;
          const batchData = progress[batchKey];

          return (
            <div
              key={num}
              onClick={() => onSelectBatch(num)}
              className={`flex justify-between items-center p-4 border rounded-lg shadow cursor-pointer hover:bg-blue-50 transition
                ${
                  batchData?.completed ? "border-green-500" : "border-gray-300"
                }`}
            >
              {/* Title */}
              <h2 className="text-lg font-semibold">Questions Set {num}</h2>

              {/* Status */}
              {batchData?.completed ? (
                <div className="text-sm text-green-600">
                  ✅ Completed <br />
                  Score: {batchData.score}/{batchData.total}
                </div>
              ) : batchData ? (
                <div className="text-sm text-blue-600">⏸ Resume Incomplete</div>
              ) : (
                <div className="text-sm text-gray-500">Not Attempted</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
