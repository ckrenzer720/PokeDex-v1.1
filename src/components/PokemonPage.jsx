import React from "react";
import { useParams } from "react-router-dom";
import {
  useGetPokemonDetailsQuery,
  useGetPokemonSpeciesQuery,
} from "../state/PokedexApi";
import PokeballLoader from "./PokeballLoader";
import PokemonDetails from "./PokemonDetails";
import "../styles/App.css";

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

const PokemonPage = () => {
  const { num } = useParams();
  const { data: pokemonDetails, isLoading: isDetailsLoading } =
    useGetPokemonDetailsQuery(num);
  const { data: pokemonSpecies, isLoading: isSpeciesLoading } =
    useGetPokemonSpeciesQuery(num);

  if (isDetailsLoading || isSpeciesLoading) return <PokeballLoader />;
  if (!pokemonDetails || !pokemonSpecies) return <p>Pokémon not found.</p>;

  return (
    <div className="pokemon-details-page">
      <div className="pokemon-details-container">
        <div className="pokemon-left-section">
          <img
            src={pokemonDetails.sprites.front_default}
            alt={pokemonDetails.name}
            className="pokemon-image"
          />
          <div className="pokemon-name-container">
            <span className="pokemon-name">{pokemonDetails.name}</span>
            <span className="pokemon-number">{getPokemonNumber(num)}</span>
          </div>
          <div className="pokemon-types">
            {pokemonDetails.types.map((typeObj) => (
              <span
                key={typeObj.type.name}
                className={`type-badge type-${typeObj.type.name}`}
                style={{ marginRight: 8 }}
              >
                {typeObj.type.name.charAt(0).toUpperCase() +
                  typeObj.type.name.slice(1)}
              </span>
            ))}
          </div>
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
        <div className="pokemon-right-section">
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
      </div>
    </div>
  );
};

export default PokemonPage;
