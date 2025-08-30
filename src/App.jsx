import React, { useState, useEffect } from "react";
import axios from "axios";
import Quiz from "./Components/Quiz";
import Result from "./Components/Result";

function App() {
  const [questions, setQuestions] = useState([]);
  const [originalSet, setOriginalSet] = useState([]);
  const [score, setScore] = useState(0);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  // Fetch new set of questions
  const loadQuestions = () => {
    axios.get("https://quiz-backend-fqbt.onrender.com/questions")
      .then(res => {
        const allQuestions = Array.isArray(res.data) ? res.data : res.data.questions;
        if (!Array.isArray(allQuestions)) {
          console.error("Unexpected data format:", res.data);
          return;
        }
        const selected = [...allQuestions]
          .sort(() => Math.random() - 0.5)
          .slice(0, 5); // Change 5 → 10 if you want 10 Qs

        setQuestions(selected);
        setOriginalSet(selected);
        setScore(0);
        setCurrentQIndex(0);
        setIsFinished(false);
      })
      .catch(err => console.error(err));
  };

  // Retry same set of questions
  const trySameSet = () => {
    setQuestions(originalSet);
    setScore(0);
    setCurrentQIndex(0);
    setIsFinished(false);
  };

  // Run once when app starts
  useEffect(() => {
    loadQuestions();
  }, []);

  // Handle user selecting an answer
  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      setScore(prev => prev + 1);
    }
    const nextQ = currentQIndex + 1;
    if (nextQ < questions.length) {
      setCurrentQIndex(nextQ);
    } else {
      setIsFinished(true);
    }
  };

  if (!questions.length) {
    return <div className="container mt-5">Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <h1 className="text-primary text-center mb-4">Quiz App</h1>
      {isFinished ? (
        <Result
          score={score}
          total={questions.length}
          onPlayAgain={trySameSet}
          onNewSet={loadQuestions}
        />
      ) : (
        <Quiz
          question={questions[currentQIndex]}
          questionNumber={currentQIndex + 1}
          totalQuestions={questions.length}
          onAnswer={handleAnswer}
        />
      )}
    </div>
  );
}

export default App;



