import React, { useState } from "react";
import axios from "axios";
import Leaderboard from "./Leaderboard";

function Result({ score, total, onPlayAgain, onNewSet }) {
  const [name, setName] = useState("");
  const [saved, setSaved] = useState(false);

  const saveScore = () => {
    if (!name.trim()) return;
    axios.post("https://quiz-backend-fqbt.onrender.com/scores", { name, score })
      .then(() => setSaved(true))
      .catch(err => console.error(err));
  };

  return (
    <div className="text-center">
      <h2 className="text-success">Quiz Completed!</h2>
      <p className="fs-4">Your Score: {score} / {total}</p>

      {!saved && (
        <div className="my-3">
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button className="btn btn-success" onClick={saveScore}>
            Save Score
          </button>
        </div>
      )}

      {saved && <Leaderboard latestScore={score} latestName={name} />}

      <div className="d-flex justify-content-center gap-3 mt-4">
        <button className="btn btn-warning" onClick={onPlayAgain}>
          Try Again 
        </button>
        <button className="btn btn-primary" onClick={onNewSet}>
          New Set of Questions
        </button>
      </div>
    </div>
  );
}

export default Result;




