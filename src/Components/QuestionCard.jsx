import React, { useState } from "react";

function QuestionCard({ question, questionNumber, totalQuestions, onAnswer }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);

  const handleClick = (optionKey) => {
    if (showAnswer) return; // prevent multiple clicks
    setSelectedOption(optionKey);
    setShowAnswer(true); // show colors
    const isCorrect = optionKey === question.answer;

    // Wait 1.5 seconds before moving to the next question
    setTimeout(() => {
      onAnswer(isCorrect);
      setSelectedOption(null);
      setShowAnswer(false);
    }, 1500);
  };

  const getButtonClass = (optionKey) => {
    if (!showAnswer) return "btn btn-outline-primary";

    if (optionKey === question.answer) {
      return "btn btn-success"; // correct answer green
    }
    if (optionKey === selectedOption && optionKey !== question.answer) {
      return "btn btn-danger"; // wrong selection red
    }
    return "btn btn-outline-secondary"; // others grey
  };

  return (
    <div className="card p-4">
      <h5 className="mb-3">
        Question {questionNumber} of {totalQuestions}
      </h5>
      <p className="fw-bold">{question.question}</p>
      <div className="d-grid gap-2">
        {["A", "B", "C", "D"].map((optionKey) => (
          <button
            key={optionKey}
            className={getButtonClass(optionKey)}
            onClick={() => handleClick(optionKey)}
            disabled={showAnswer} // disable until next question
          >
            {question[optionKey]}
          </button>
        ))}
      </div>
    </div>
  );
}

export default QuestionCard;



