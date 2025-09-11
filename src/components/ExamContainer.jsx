import { useState, useEffect } from "react";
import QuestionCard from "./QuestionCard";
import Navigation from "./Navigation";
import Timer from "./Timer";
import { questionBatches } from "../questions";

export default function ExamContainer({ batchNum, onExit }) {
  const questions = questionBatches[batchNum];
  const storageKey = `batch-${batchNum}`;

  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(60);

  // Load saved progress if exists
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("examProgress") || "{}");
    if (saved[storageKey] && !saved[storageKey].completed) {
      setAnswers(saved[storageKey].answers || {});
      setCurrent(saved[storageKey].current || 0);
      setTimeLeft(saved[storageKey].timeLeft ?? 60);
    }
  }, [storageKey]);

  // Save progress continuously
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("examProgress") || "{}");
    saved[storageKey] = {
      ...saved[storageKey],
      completed: false,
      answers,
      current,
      timeLeft,
      total: questions.length,
    };
    localStorage.setItem("examProgress", JSON.stringify(saved));
  }, [answers, current, timeLeft, storageKey, questions.length]);

  // Reset timer on new question
  useEffect(() => {
    setTimeLeft(60);
  }, [current]);

  const handleSelect = (id, option) => {
    setAnswers((prev) => ({
      ...prev,
      [id]: { selected: option, checked: false },
    }));
  };

  const handleCheck = (id) => {
    setAnswers((prev) => ({
      ...prev,
      [id]: { ...prev[id], checked: true },
    }));
  };

  const handleTimeUp = () => {
    if (current < questions.length - 1) {
      setCurrent((c) => c + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    let score = 0;
    questions.forEach((q) => {
      if (answers[q.id]?.selected === q.answer) score++;
    });

    const saved = JSON.parse(localStorage.getItem("examProgress") || "{}");
    saved[storageKey] = {
      completed: true,
      score,
      total: questions.length,
    };
    localStorage.setItem("examProgress", JSON.stringify(saved));

    alert(`Batch ${batchNum} completed! Score: ${score}/${questions.length}`);
    onExit();
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      {/* 🔙 Back Button */}
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={onExit}
          className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded text-sm"
        >
          ← Back
        </button>
        <Timer
          timeLeft={timeLeft}
          setTimeLeft={setTimeLeft}
          onTimeUp={handleTimeUp}
        />
      </div>

      {/* Question */}
      <QuestionCard
        question={questions[current]}
        answerState={answers[questions[current].id]}
        onSelect={(option) => handleSelect(questions[current].id, option)}
        onCheck={() => handleCheck(questions[current].id)}
      />

      {/* Navigation */}
      <Navigation
        current={current}
        total={questions.length}
        onPrev={() => setCurrent((c) => c - 1)}
        onNext={() => setCurrent((c) => c + 1)}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
