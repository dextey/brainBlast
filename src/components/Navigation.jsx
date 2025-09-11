export default function Navigation({
  current,
  total,
  onPrev,
  onNext,
  onSubmit,
}) {
  return (
    <div className="flex justify-between mt-4">
      <button
        onClick={onPrev}
        disabled={current === 0}
        className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
      >
        ← Prev
      </button>

      {current < total - 1 ? (
        <button
          onClick={onNext}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Next →
        </button>
      ) : (
        <button
          onClick={onSubmit}
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          Submit Exam
        </button>
      )}
    </div>
  );
}
