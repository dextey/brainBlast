import { useState } from "react";

import ExamContainer from "./components/ExamContainer";
import BatchSelector from "./components/BatchSelector";

export default function App() {
  const [activeBatch, setActiveBatch] = useState(null);

  return (
    <div className="min-h-screen bg-gray-100">
      {activeBatch ? (
        <ExamContainer
          batchNum={activeBatch}
          onExit={() => setActiveBatch(null)}
        />
      ) : (
        <BatchSelector onSelectBatch={setActiveBatch} />
      )}
    </div>
  );
}
