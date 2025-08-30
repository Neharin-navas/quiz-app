import React from "react";
import QuestionCard from "./QuestionCard";

function Quiz({ question, questionNumber, totalQuestions, onAnswer }) {
  return (
    <QuestionCard
      question={question}
      questionNumber={questionNumber}
      totalQuestions={totalQuestions}
      onAnswer={onAnswer}
    />
  );
}

export default Quiz;
