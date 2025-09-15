import { useState, useEffect } from "react";

const batches = Array.from({ length: 10 }, (_, i) => i + 1);

export default function BatchSelector({ onSelectBatch }) {
  const [progress, setProgress] = useState({});

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("examProgress") || "{}");
    setProgress(saved);
  }, []);

  // ✅ Sort: incomplete/resumable first, completed last
  const sortedBatches = [...batches].sort((a, b) => {
    const aCompleted = progress[`batch-${a}`]?.completed || false;
    const bCompleted = progress[`batch-${b}`]?.completed || false;

    if (aCompleted === bCompleted) return a - b; // keep original order
    return aCompleted ? 1 : -1; // completed goes last
  });

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">📦 Select a Question Set</h1>

      <div className="flex flex-col gap-3">
        {sortedBatches.map((num) => {
          const batchKey = `batch-${num}`;
          const batchData = progress[batchKey];
          let hard = null;
          if (num === 9) hard = "HARD";
          if (num === 10) hard = "MATH";

          return (
            <div
              key={num}
              onClick={() => onSelectBatch(num)}
              className={`flex justify-between items-center p-4 border rounded-lg shadow cursor-pointer hover:bg-blue-50 transition relative
                ${batchData?.completed ? "border-green-500" : "border-gray-300"}
                `}
            >
              {/* Hard/MATH Ribbon */}
              {hard && (
                <div
                  className={`px-3 text-white w-15 absolute text-center text-[.71rem] -rotate-90 left-[-23px] rounded-t-lg ${
                    hard === "MATH" ? "bg-blue-400" : "bg-red-400"
                  } ${
                    batchData?.completed
                      ? "w-18 left-[-28px]"
                      : "border-gray-300"
                  }`}
                >
                  {hard}
                </div>
              )}

              {/* Title */}
              <h2 className="text-lg font-semibold">Question Set {num}</h2>

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
