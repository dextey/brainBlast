export default function QuestionCard({
  question,
  answerState,
  onSelect,
  onCheck,
}) {
  const selected = answerState?.selected || null;
  const checked = answerState?.checked || false;
  const isCorrect = selected === question.answer;

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-lg font-semibold mb-4">{question.question}</h2>

      {/* Choices */}
      <div className="space-y-2 mb-4">
        {Object.entries(question.choices).map(([key, value]) => (
          <label
            key={key}
            className={`flex items-center space-x-2 cursor-pointer p-2 rounded 
              ${checked && key === question.answer ? "bg-green-100" : ""}
              ${
                checked && selected === key && selected !== question.answer
                  ? "bg-red-100"
                  : ""
              }
            `}
          >
            <input
              type="radio"
              name={`q-${question.id}`}
              value={key}
              checked={selected === key}
              onChange={() => onSelect(key)}
              className="form-radio text-blue-600"
            />
            <span>
              <strong>{key}.</strong> {value}
            </span>
          </label>
        ))}
      </div>

      {/* Check Button */}
      <button
        onClick={onCheck}
        disabled={!selected}
        className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
      >
        Check Answer
      </button>

      {/* Feedback */}
      {checked && (
        <div
          className={`mt-4 p-3 rounded ${
            isCorrect
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {isCorrect ? (
            <p>🎉 Correct! {question.answer_explanation}</p>
          ) : (
            <p>
              ❌ Wrong. Correct answer is <strong>{question.answer}</strong> –{" "}
              {question.choices[question.answer]}. <br />
              {question.answer_explanation}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
