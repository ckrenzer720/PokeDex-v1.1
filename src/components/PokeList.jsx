import React, { useState } from "react";
import {
  useGetPokemonListQuery,
  useGetPokemonDetailsQuery,
} from "../state/PokedexApi";

const PokeList = () => {
  const { data, error, isLoading } = useGetPokemonListQuery();
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  // Fetch details for the selected Pokémon
  const { data: pokemonDetails, isLoading: isDetailsLoading } =
    useGetPokemonDetailsQuery(
      selectedPokemon,
      { skip: !selectedPokemon } // Skip query if no Pokémon is selected
    );

  if (isLoading) return <p>Loading Pokémon...</p>;
  if (error) return <p>Failed to load Pokémon. Please try again later.</p>;

  return (
    <div className="pokemon-container">
      <div className="pokemon-list">
        {data.results.map((pokemon, index) => (
          <div
            key={index}
            className="pokemon-card"
            onClick={() => setSelectedPokemon(pokemon.name)} // Set selected Pokémon on click
          >
            <h3>{pokemon.name}</h3>
          </div>
        ))}
      </div>

      {selectedPokemon && (
        <div className="pokemon-details">
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
