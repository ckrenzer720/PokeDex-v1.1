import React, { useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  useGetPokemonDetailsQuery,
  useGetPokemonSpeciesQuery,
} from "../state/PokedexApi";
import PokeballLoader from "./PokeballLoader";
import PokemonDetails from "./PokemonDetails";
import AddToTeamButton from "./AddToTeamButton";
import AddToFavoritesButton from "./AddToFavoritesButton";
import "../styles/main.css";

const getPokemonNumber = (num) => `#${String(num).padStart(4, "0")}`;

// Convert meters to feet and inches
const metersToFeetInches = (meters) => {
  const totalInches = meters * 39.3701;
  const feet = Math.floor(totalInches / 12);
  const inches = Math.round(totalInches % 12);
  return `${feet}'${inches}"`;
};

// Convert kilograms to pounds
const kgToPounds = (kg) => {
  const pounds = kg * 2.20462;
  return `${pounds.toFixed(1)} lbs`;
};

const getGenus = (species) => {
  const genusObj = species.genera?.find((g) => g.language.name === "en");
  return genusObj ? genusObj.genus : "-";
};

const getGenderIcons = (species) => {
  // If gender_rate is -1, Pokémon is genderless
  if (species.gender_rate === -1) return "-";
  // Otherwise, show both icons (♂ ♀) for simplicity
  return "♂ ♀";
};

const PokemonPage = ({ isAuthenticated }) => {
  const { num } = useParams();
  const navigate = useNavigate();
  const { data: pokemonDetails, isLoading: isDetailsLoading } =
    useGetPokemonDetailsQuery(num);
  const { data: pokemonSpecies, isLoading: isSpeciesLoading } =
    useGetPokemonSpeciesQuery(num);

  const currentNum = parseInt(num);
  const isFirstPokemon = currentNum <= 1;
  const isLastPokemon = currentNum >= 1010; // Assuming we have up to 1010 Pokemon

  const handlePreviousPokemon = useCallback(() => {
    if (!isFirstPokemon) {
      navigate(`/pokemon/${currentNum - 1}`);
    }
  }, [isFirstPokemon, navigate, currentNum]);

  const handleNextPokemon = useCallback(() => {
    if (!isLastPokemon) {
      navigate(`/pokemon/${currentNum + 1}`);
    }
  }, [isLastPokemon, navigate, currentNum]);

  // Keyboard navigation
  React.useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "ArrowLeft" && !isFirstPokemon) {
        handlePreviousPokemon();
      } else if (event.key === "ArrowRight" && !isLastPokemon) {
        handleNextPokemon();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [isFirstPokemon, isLastPokemon, handlePreviousPokemon, handleNextPokemon]);

  if (isDetailsLoading || isSpeciesLoading) return <PokeballLoader />;
  if (!pokemonDetails || !pokemonSpecies) return <p>Pokémon not found.</p>;

  return (
    <div className="pokemon-details-page">
      <div className="pokemon-trading-card">
        {/* Card Header */}
        <div className="card-header">
          <div className="pokemon-name-container">
            <span className="pokemon-name">{pokemonDetails.name}</span>
            <span className="pokemon-number">{getPokemonNumber(num)}</span>
          </div>
          <div className="pokemon-types">
            {pokemonDetails.types.map((typeObj) => (
              <span
                key={typeObj.type.name}
                className={`type-badge type-${typeObj.type.name}`}
              >
                {typeObj.type.name.charAt(0).toUpperCase() +
                  typeObj.type.name.slice(1)}
              </span>
            ))}
          </div>
        </div>

        {/* Card Image Section */}
        <div className="card-image-section">
          <button
            className="pokemon-nav-arrow pokemon-nav-arrow-left"
            onClick={handlePreviousPokemon}
            disabled={isFirstPokemon}
            title="Previous Pokemon"
            aria-label="Previous Pokemon"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 18L9 12L15 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <img
            src={pokemonDetails.sprites.front_default}
            alt={pokemonDetails.name}
            className="pokemon-card-image"
          />
          <button
            className="pokemon-nav-arrow pokemon-nav-arrow-right"
            onClick={handleNextPokemon}
            disabled={isLastPokemon}
            title="Next Pokemon"
            aria-label="Next Pokemon"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 18L15 12L9 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {/* Card Info Section */}
        <div className="card-info-section">
          <div className="pokemon-info-card">
            <div className="pokemon-info-group">
              <div className="pokemon-info-label">Height</div>
              <div className="pokemon-info-value">
                {metersToFeetInches(pokemonDetails.height / 10)}
              </div>
              <div className="pokemon-info-label">Weight</div>
              <div className="pokemon-info-value">
                {kgToPounds(pokemonDetails.weight / 10)}
              </div>
              <div className="pokemon-info-label">Gender</div>
              <div className="pokemon-info-gender">
                {getGenderIcons(pokemonSpecies)}
              </div>
            </div>
            <div className="pokemon-info-group">
              <div className="pokemon-info-label">Category</div>
              <div className="pokemon-info-value">
                {getGenus(pokemonSpecies)}
              </div>
              <div className="pokemon-info-label">Abilities</div>
              <div className="pokemon-info-value">
                {pokemonDetails.abilities.map((a) => a.ability.name).join(", ")}
              </div>
            </div>
          </div>
        </div>

        {/* Card Stats Section */}
        <div className="card-stats-section">
          <PokemonDetails
            pokemon={{
              ...pokemonDetails,
              stats: pokemonDetails.stats.map((s) => ({
                name:
                  s.stat.name === "special-attack"
                    ? "Special Attack"
                    : s.stat.name === "special-defense"
                    ? "Special Defense"
                    : s.stat.name.charAt(0).toUpperCase() +
                      s.stat.name.slice(1),
                value: s.base_stat,
              })),
            }}
          />
        </div>

        {/* Add to Team and Favorites Buttons */}
        <div className="card-team-section">
          <div className="action-buttons-container">
            <AddToTeamButton
              pokemon={pokemonDetails}
              isAuthenticated={isAuthenticated}
              size="large"
              showText={true}
            />
            <AddToFavoritesButton
              pokemon={pokemonDetails}
              isAuthenticated={isAuthenticated}
              size="large"
              showText={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonPage;
