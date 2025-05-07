import React, { useState, useEffect } from "react";
import {
  useGetPokemonListQuery,
  useGetPokemonDetailsQuery,
  useGetPokemonSpeciesQuery,
} from "../state/PokedexApi";
import PokemonSearchBar from "./PokemonSearchBar";

const PokeList = ({ isAuthenticated }) => {
  const [filters, setFilters] = useState({ search: "", type: "" });
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [view, setView] = useState("grid");
  const [cachedData, setCachedData] = useState({}); // Cache for Pokémon data

  const offset = (page - 1) * limit;

  const { data, error, isLoading } = useGetPokemonListQuery({
    ...filters,
    limit,
    offset,
  });
  ``;
  const { data: pokemonDetails, isLoading: isDetailsLoading } =
    useGetPokemonDetailsQuery(selectedPokemon, {
      skip: !selectedPokemon, // Skip the query if no Pokémon is selected
    });

  const { data: pokemonSpecies, isLoading: isSpeciesLoading } =
    useGetPokemonSpeciesQuery(selectedPokemon, {
      skip: !selectedPokemon, // Skip the query if no Pokémon is selected
    });

  const totalPages = data ? Math.ceil(data.count / limit) : 0;

  // Cache the data for the current page
  useEffect(() => {
    if (data && !filters.type) {
      setCachedData((prev) => ({
        ...prev,
        [page]: data.results,
      }));
    }
  }, [data, page, filters.type]);

  // Combine cached data with the current page data
  const pokemonList = filters.type
    ? data?.pokemon
        ?.map((p) => p.pokemon) // Handle type-filtered response
        .slice(offset, offset + limit) || [] // Apply limit and offset
    : cachedData[page] || [];

  const handleSearch = (newFilters) => {
    setFilters(newFilters);
    setPage(1); // Reset to the first page when searching
  };

  const handleNextPage = () => setPage((prev) => prev + 1);
  const handlePrevPage = () => setPage((prev) => Math.max(prev - 1, 1));

  const handlePokemonClick = (pokemon) => {
    setSelectedPokemon(pokemon.name); // Set the Pokémon name for fetching details
  };

  const handleAddToTeam = (pokemon) => {
    if (!isAuthenticated) {
      alert("Please log in to add Pokémon to your team.");
      return;
    }
    // Logic to add Pokémon to the team
    console.log(`${pokemon.name} added to your team!`);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (page <= 3) {
        pageNumbers.push(1, 2, 3, 4, "...", totalPages);
      } else if (page >= totalPages - 2) {
        pageNumbers.push(
          1,
          "...",
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages
        );
      } else {
        pageNumbers.push(1, "...", page - 1, page, page + 1, "...", totalPages);
      }
    }

    return pageNumbers.map((pageNumber, index) =>
      pageNumber === "..." ? (
        <span key={`ellipsis-${index}`} className="ellipsis">
          ...
        </span>
      ) : (
        <button
          key={`page-${pageNumber}`}
          onClick={() => setPage(pageNumber)}
          className={page === pageNumber ? "active" : ""}
        >
          {pageNumber}
        </button>
      )
    );
  };

  if (isLoading && !cachedData[page]) return <p>Loading Pokémon...</p>;
  if (error) {
    console.error("Error fetching Pokémon:", error);
    return <p>Failed to load Pokémon. Please try again later.</p>;
  }

  return (
    <div className="pokemon-container">
      <div className="header">
        <h1>Pokédex</h1>
        <PokemonSearchBar onSearch={handleSearch} />
        <div className="results-per-page">
          <label htmlFor="results-per-page">Pokémon per page:</label>
          <select
            id="results-per-page"
            value={limit}
            onChange={(e) => {
              setLimit(Number(e.target.value));
              setPage(1); // Reset to the first page when the limit changes
            }}
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>
        <button
          onClick={() => setView((prev) => (prev === "grid" ? "list" : "grid"))}
        >
          Switch to {view === "grid" ? "List" : "Grid"} View
        </button>
      </div>
      <div className="main-content">
        <div className={`pokemon-list ${view}`}>
          {pokemonList.map((pokemon, index) => (
            <div
              key={index}
              className="pokemon-card"
              onClick={() => handlePokemonClick(pokemon)}
            >
              <h3>{pokemon.name}</h3>
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                  pokemon.url.split("/").slice(-2, -1)[0]
                }.png`}
                alt={pokemon.name}
              />
              <button onClick={() => handleAddToTeam(pokemon)}>
                Add to Team
              </button>
            </div>
          ))}
        </div>
        {selectedPokemon && (
          <div className="pokemon-details">
            <button onClick={() => setSelectedPokemon(null)}>
              Back to List
            </button>
            {isDetailsLoading || isSpeciesLoading ? (
              <p>Loading details...</p>
            ) : (
              pokemonDetails &&
              pokemonSpecies && (
                <div>
                  <h2>{pokemonDetails.name}</h2>
                  <img
                    src={pokemonDetails.sprites.front_default}
                    alt={pokemonDetails.name}
                  />
                  <p>
                    <strong>Height:</strong> {pokemonDetails.height}
                  </p>
                  <p>
                    <strong>Weight:</strong> {pokemonDetails.weight}
                  </p>
                  <p>
                    <strong>Base Experience:</strong>{" "}
                    {pokemonDetails.base_experience}
                  </p>
                  <p>
                    <strong>Generation:</strong>{" "}
                    {pokemonSpecies.generation.name}
                  </p>
                  <p>
                    <strong>Abilities:</strong>
                  </p>
                  <ul>
                    {pokemonDetails.abilities.map((ability, index) => (
                      <li key={index}>{ability.ability.name}</li>
                    ))}
                  </ul>
                  <p>
                    <strong>Types:</strong>
                  </p>
                  <ul>
                    {pokemonDetails.types.map((type, index) => (
                      <li key={index}>{type.type.name}</li>
                    ))}
                  </ul>
                </div>
              )
            )}
          </div>
        )}
      </div>
      <div className="pagination">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 10, 1))}
          disabled={page <= 10}
        >
          &laquo; Skip 10
        </button>
        <button onClick={handlePrevPage} disabled={page === 1}>
          &lt; Prev
        </button>
        {renderPageNumbers()}
        <button onClick={handleNextPage} disabled={page === totalPages}>
          Next &gt;
        </button>
        <button
          onClick={() => setPage((prev) => Math.min(prev + 10, totalPages))}
          disabled={page > totalPages - 10}
        >
          Skip 10 &raquo;
        </button>
      </div>
    </div>
  );
};

export default PokeList;
