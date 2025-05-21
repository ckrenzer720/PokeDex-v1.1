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

app.delete("/api/pokemons/:name", (req, res) => {
  const pokemonName = req.params.name;
  const team = pokemonTeams.get("default") || [];

  // Find the index of the Pokémon to remove
  const index = team.findIndex((p) => p.name === pokemonName);

  if (index === -1) {
    return res.status(404).json({ error: "Pokémon not found in team" });
  }

  // Remove the Pokémon from the team
  team.splice(index, 1);
  pokemonTeams.set("default", team);

  res.status(200).json({ message: `${pokemonName} removed from team` });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
