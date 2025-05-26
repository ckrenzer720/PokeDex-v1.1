import React from "react";
import { useParams } from "react-router-dom";
import {
  useGetPokemonDetailsQuery,
  useGetPokemonSpeciesQuery,
} from "../state/PokedexApi";
import PokeballLoader from "./PokeballLoader";
import PokemonDetails from "./PokemonDetails";

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

const PokemonPage = () => {
  const { num } = useParams();
  const { data: pokemonDetails, isLoading: isDetailsLoading } =
    useGetPokemonDetailsQuery(num);
  const { data: pokemonSpecies, isLoading: isSpeciesLoading } =
    useGetPokemonSpeciesQuery(num);

  if (isDetailsLoading || isSpeciesLoading) return <PokeballLoader />;
  if (!pokemonDetails || !pokemonSpecies) return <p>Pokémon not found.</p>;

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: 40 }}>
      <div
        style={{
          background: "#fff",
          borderRadius: 20,
          boxShadow: "0 4px 24px rgba(60,60,60,0.12)",
          padding: 32,
          maxWidth: 800,
          width: "100%",
          display: "flex",
          gap: 32,
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img
            src={pokemonDetails.sprites.front_default}
            alt={pokemonDetails.name}
            style={{
              width: 220,
              height: 220,
              objectFit: "contain",
              marginBottom: 16,
            }}
          />
          <div style={{ marginBottom: 16 }}>
            <span
              style={{
                fontSize: 32,
                fontWeight: 700,
                color: "#3b4cca",
                textTransform: "capitalize",
              }}
            >
              {pokemonDetails.name}
            </span>
            <span style={{ fontSize: 24, color: "#bdbdbd", marginLeft: 12 }}>
              {getPokemonNumber(num)}
            </span>
          </div>
          <div style={{ marginBottom: 16 }}>
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
        <div style={{ flex: 1 }}>
          <h3 style={{ marginTop: 0 }}>About</h3>
          <p style={{ fontSize: 16, color: "#444" }}>
            {pokemonSpecies.flavor_text_entries
              ?.find((entry) => entry.language.name === "en")
              ?.flavor_text.replace(/\f/g, " ")}
          </p>
          <div style={{ margin: "18px 0" }}>
            <strong>Height:</strong>{" "}
            {metersToFeetInches(pokemonDetails.height / 10)}
            <br />
            <strong>Weight:</strong> {kgToPounds(pokemonDetails.weight / 10)}
            <br />
            <strong>Base Experience:</strong> {pokemonDetails.base_experience}
            <br />
            <strong>Abilities:</strong>{" "}
            {pokemonDetails.abilities.map((a) => a.ability.name).join(", ")}
            <br />
            <strong>Types:</strong>{" "}
            {pokemonDetails.types.map((t) => t.type.name).join(", ")}
            <br />
            <strong>Generation:</strong> {pokemonSpecies.generation.name}
            <br />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonPage;
