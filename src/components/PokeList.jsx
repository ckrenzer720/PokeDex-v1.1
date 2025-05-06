import React, { useState } from "react";
import {
  useGetPokemonListQuery,
  useGetPokemonDetailsQuery,
} from "../state/PokedexApi";
import PokemonSearchBar from "./PokemonSearchBar";

const PokeList = () => {
  const [filters, setFilters] = useState({ search: "", type: "" });
  const { data, error, isLoading } = useGetPokemonListQuery(filters);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  // Fetch details for the selected Pokémon
  const { data: pokemonDetails, isLoading: isDetailsLoading } =
    useGetPokemonDetailsQuery(selectedPokemon, { skip: !selectedPokemon });

  const handleSearch = (newFilters) => {
    console.log("New Filters:", newFilters);
    setFilters(newFilters);
  };

  if (isLoading) return <p>Loading Pokémon...</p>;
  if (error) {
    console.error("Error fetching Pokémon:", error);
    return <p>Failed to load Pokémon. Please try again later.</p>;
  }

  // Handle different response structures
  const pokemonList = filters.search
    ? data && !data.results
      ? [data]
      : []
    : filters.type
    ? data?.pokemon?.map((p) => p.pokemon) || []
    : data?.results || [];

  console.log("Filters:", filters);
  console.log("API Response:", data);
  console.log("Pokemon List:", pokemonList);

  return (
    <div className="pokemon-container">
      {/* Search Bar */}
      <PokemonSearchBar onSearch={handleSearch} />

      {/* Pokémon List */}
      <div className="pokemon-list">
        {pokemonList.map((pokemon, index) => (
          <div
            key={index}
            className={`pokemon-card ${
              selectedPokemon === pokemon.name ? "selected" : ""
            }`}
            onClick={() => setSelectedPokemon(pokemon.name)}
          >
            <h3>{pokemon.name}</h3>
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                pokemon.id || index + 1
              }.png`}
              alt={pokemon.name}
            />
          </div>
        ))}
      </div>

      {/* Pokémon Details */}
      {selectedPokemon && (
        <div className="pokemon-details">
          <button onClick={() => setSelectedPokemon(null)}>Back to List</button>
          {isDetailsLoading ? (
            <p>Loading details...</p>
          ) : (
            pokemonDetails && (
              <div>
                <h2>{pokemonDetails.name}</h2>
                <img
                  src={pokemonDetails.sprites.front_default}
                  alt={pokemonDetails.name}
                />
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default PokeList;
