import React from "react";
import "../styles/App.css";

const STAT_LABELS = [
  "HP",
  "Attack",
  "Defense",
  "Special Attack",
  "Special Defense",
  "Speed",
];

const getStatValue = (stats, label) => {
  const stat = stats.find(
    (s) =>
      s.name.toLowerCase().replace(" ", "-") ===
      label.toLowerCase().replace(" ", "-")
  );
  return stat ? stat.value : 0;
};

const PokemonDetails = ({ pokemon }) => {
  if (!pokemon) return null;

  const maxStat = 150; // Adjust as needed for scaling

  return (
    <div className="stats-section">
      <h3>Stats</h3>
      <div className="stats-bars">
        {STAT_LABELS.map((label) => (
          <div className="stat-bar-container" key={label}>
            <div
              className="stat-bar"
              style={{
                width: `${
                  (getStatValue(pokemon.stats, label) / maxStat) * 100
                }%`,
              }}
            />
            <div className="stat-label">{label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PokemonDetails;
