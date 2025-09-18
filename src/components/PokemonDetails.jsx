import React, { useMemo } from "react";
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

const PokemonDetails = React.memo(({ pokemon }) => {
  const maxStat = 150; // Adjust as needed for scaling

  const statBars = useMemo(() => {
    if (!pokemon?.stats) return null;

    return STAT_LABELS.map((label) => {
      const value = getStatValue(pokemon.stats, label);
      const percentage = (value / maxStat) * 100;

      return (
        <div className="stat-bar-container" key={label}>
          <div className="stat-info">
            <span className="stat-label">{label}</span>
            <span className="stat-value">{value}</span>
          </div>
          <div className="stat-bar-wrapper">
            <div
              className="stat-bar"
              style={{
                width: `${percentage}%`,
                backgroundColor: `hsl(${(percentage / 100) * 120}, 70%, 50%)`,
              }}
            />
          </div>
        </div>
      );
    });
  }, [pokemon?.stats, maxStat]);

  if (!pokemon) return null;

  return (
    <div className="stats-section">
      <h3>Base Stats</h3>
      <div className="stats-bars">{statBars}</div>
    </div>
  );
});

PokemonDetails.displayName = "PokemonDetails";

export default PokemonDetails;
