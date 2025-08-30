import React, { useEffect, useState } from "react";
import axios from "axios";

function Leaderboard({ latestScore, latestName }) {
  const [scores, setScores] = useState([]);
  const [playerRank, setPlayerRank] = useState(null);

  useEffect(() => {
    axios.get("https://quiz-backend-fqbt.onrender.com/scores")
      .then(res => {
        const sortedScores = res.data.sort((a, b) => b.score - a.score);

        // Find player's rank
        const rank = sortedScores.findIndex(
          s => s.name === latestName && s.score === latestScore
        );
        if (rank !== -1) {
          setPlayerRank(rank + 1); // ranks are 1-based
        }

        // Show top 5
        setScores(sortedScores.slice(0, 5));
      })
      .catch(err => console.error(err));
  }, [latestScore, latestName]);

  return (
    <div className="mt-4">
      <h3 style={{ color: "limegreen" }}>
        <span role="img" aria-label="trophy">🏆</span> Leaderboard
      </h3>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {scores.map((entry, idx) => (
          <li
            key={idx}
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "8px",
              border: "1px solid black",
              borderRadius: "4px",
              marginBottom: "5px",
              backgroundColor:
                entry.name === latestName && entry.score === latestScore
                  ? "#d4edda" // light green for highlight
                  : "white"
            }}
          >
            <span>{idx + 1}.</span>
            <span>{entry.name}</span>
            <span>{entry.score}</span>
          </li>
        ))}
      </ul>

      {playerRank && playerRank > 5 && (
        <p style={{ marginTop: "10px", fontWeight: "bold" }}>
          Your Rank: #{playerRank} 
        </p>
      )}
    </div>
  );
}

export default Leaderboard;


