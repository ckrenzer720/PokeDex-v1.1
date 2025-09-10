import React, { useState } from "react";
import { useAddPokemonMutation } from "../state/PokeCartApi";

const AddToTeamButton = ({
  pokemon,
  isAuthenticated,
  className = "",
  showText = true,
  size = "medium",
}) => {
  const [addPokemon, { isLoading }] = useAddPokemonMutation();
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToTeam = async (e) => {
    e.stopPropagation(); // Prevent triggering parent click events

    if (!isAuthenticated) {
      alert("Please log in to add Pokémon to your team.");
      return;
    }

    try {
      const pokemonInfo = {
        name: pokemon.name,
        img:
          pokemon.sprites?.front_default ||
          pokemon.img ||
          `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
            pokemon.id || pokemon.url?.split("/").slice(-2, -1)[0]
          }.png`,
      };

      await addPokemon(pokemonInfo).unwrap();
      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 2000); // Reset after 2 seconds
    } catch (error) {
      console.error("Failed to add Pokémon to team:", error);
      alert("Failed to add Pokémon to team. Please try again.");
    }
  };

  const getButtonContent = () => {
    if (isLoading) {
      return (
        <div className="pokeball-spinner">
          <div className="pokeball-loader"></div>
        </div>
      );
    }

    if (isAdded) {
      return (
        <>
          <span className="checkmark">✓</span>
          {showText && <span>Added!</span>}
        </>
      );
    }

    return (
      <>
        <img src="/pokeball.png" alt="Add to team" className="pokeball-icon" />
        {showText && <span>Add to Team</span>}
      </>
    );
  };

  const sizeClass =
    size === "small" ? "small" : size === "large" ? "large" : "";

  return (
    <button
      className={`add-to-team-btn ${className} ${sizeClass}`}
      onClick={handleAddToTeam}
      disabled={isLoading}
      title={isAuthenticated ? "Add to your team" : "Log in to add to team"}
    >
      {getButtonContent()}
    </button>
  );
};

export default AddToTeamButton;
