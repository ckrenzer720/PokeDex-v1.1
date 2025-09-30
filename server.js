import express from "express";
import cors from "cors";

const app = express();
const port = 9009;

// Middleware
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? ["https://yourdomain.com"]
        : ["http://localhost:3000", "http://localhost:5174"],
    credentials: true,
  })
);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Add compression for better performance
import compression from "compression";
app.use(compression());

// Add rate limiting
import rateLimit from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
});

app.use("/api/", limiter);

// In-memory storage for Pokémon teams
const pokemonTeams = new Map();
// In-memory storage for favorites
const pokemonFavorites = new Map();

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", timestamp: new Date().toISOString() });
});

// Routes
app.get("/api/pokemons", (req, res) => {
  try {
    const team = pokemonTeams.get("default") || [];
    res.json(team);
  } catch (error) {
    console.error("Error fetching pokemon team:", error);
    res.status(500).json({ error: "Failed to fetch pokemon team" });
  }
});

app.post("/api/pokemons", (req, res) => {
  try {
    const pokemon = req.body;

    // Validate required fields
    if (!pokemon.name || !pokemon.img) {
      return res
        .status(400)
        .json({ error: "Pokemon name and image are required" });
    }

    const team = pokemonTeams.get("default") || [];

    // Check if Pokémon is already in team
    if (team.some((p) => p.name === pokemon.name)) {
      return res.status(400).json({ error: "Pokémon already in team" });
    }

    // Add Pokémon to team
    team.push(pokemon);
    pokemonTeams.set("default", team);

    res.status(201).json(pokemon);
  } catch (error) {
    console.error("Error adding pokemon to team:", error);
    res.status(500).json({ error: "Failed to add pokemon to team" });
  }
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

// Favorites routes
app.get("/api/favorites", (req, res) => {
  const favorites = pokemonFavorites.get("default") || [];
  res.json(favorites);
});

app.post("/api/favorites", (req, res) => {
  const pokemon = req.body;
  const favorites = pokemonFavorites.get("default") || [];

  // Check if Pokémon is already in favorites
  if (favorites.some((p) => p.name === pokemon.name)) {
    return res.status(400).json({ error: "Pokémon already in favorites" });
  }

  // Add Pokémon to favorites
  favorites.push(pokemon);
  pokemonFavorites.set("default", favorites);

  res.status(201).json(pokemon);
});

app.delete("/api/favorites/:name", (req, res) => {
  const pokemonName = req.params.name;
  const favorites = pokemonFavorites.get("default") || [];

  // Find the index of the Pokémon to remove
  const index = favorites.findIndex((p) => p.name === pokemonName);

  if (index === -1) {
    return res.status(404).json({ error: "Pokémon not found in favorites" });
  }

  // Remove the Pokémon from favorites
  favorites.splice(index, 1);
  pokemonFavorites.set("default", favorites);

  res.status(200).json({ message: `${pokemonName} removed from favorites` });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
