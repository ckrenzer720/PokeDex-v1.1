import express from "express";
import cors from "cors";

const app = express();
const port = 9009;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory storage for Pokémon teams
const pokemonTeams = new Map();

// Routes
app.get("/api/pokemons", (req, res) => {
  const team = pokemonTeams.get("default") || [];
  res.json(team);
});

app.post("/api/pokemons", (req, res) => {
  const pokemon = req.body;
  const team = pokemonTeams.get("default") || [];

  // Check if Pokémon is already in team
  if (team.some((p) => p.name === pokemon.name)) {
    return res.status(400).json({ error: "Pokémon already in team" });
  }

  // Add Pokémon to team
  team.push(pokemon);
  pokemonTeams.set("default", team);

  res.status(201).json(pokemon);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
