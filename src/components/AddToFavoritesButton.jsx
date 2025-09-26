import React, { useState, useCallback, useMemo } from "react";
import { useAddFavoriteMutation, useGetFavoritesQuery } from "../state/PokeCartApi";

const AddToFavoritesButton = React.memo(
  ({
    pokemon,
    isAuthenticated,
    className = "",
    showText = true,
    size = "medium",
  }) => {
    const [addFavorite, { isLoading }] = useAddFavoriteMutation();
    const { data: favorites } = useGetFavoritesQuery();
    const [isAdded, setIsAdded] = useState(false);

    // Check if Pokemon is already in favorites
    const isFavorite = useMemo(() => {
      return favorites?.some((f) => f.name === pokemon.name);
    }, [favorites, pokemon.name]);

    const handleAddToFavorites = useCallback(
      async (e) => {
        e.stopPropagation(); // Prevent triggering parent click events

        if (!isAuthenticated) {
          alert("Please log in to add Pokémon to your favorites.");
          return;
        }

        if (isFavorite) {
          alert("This Pokémon is already in your favorites!");
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

          await addFavorite(pokemonInfo).unwrap();
          setIsAdded(true);
          setTimeout(() => setIsAdded(false), 2000); // Reset after 2 seconds
        } catch (error) {
          console.error("Failed to add Pokémon to favorites:", error);
          
          // Provide more helpful error messages
          let errorMessage = "Failed to add Pokémon to favorites. Please try again.";
          
          if (error?.status === "FETCH_ERROR" || error?.error === "TypeError: Failed to fetch") {
            errorMessage = "Unable to connect to the server. Please make sure the backend server is running on port 9009.\n\nRun: npm run server";
          } else if (error?.data?.error) {
            errorMessage = error.data.error;
          } else if (error?.status === 400) {
            errorMessage = error?.data?.error || "This Pokémon is already in your favorites!";
          }
          
          alert(errorMessage);
        }
      },
      [pokemon, isAuthenticated, addFavorite, isFavorite]
    );

    const buttonContent = useMemo(() => {
      if (isLoading) {
        return (
          <div className="favorite-spinner">
            <span className="star-icon">★</span>
          </div>
        );
      }

      if (isAdded || isFavorite) {
        return (
          <>
            <span className="star-icon filled">★</span>
            {showText && <span>{isAdded ? "Added!" : "Favorited"}</span>}
          </>
        );
      }

      return (
        <>
          <span className="star-icon">☆</span>
          {showText && <span>Favorite</span>}
        </>
      );
    }, [isLoading, isAdded, isFavorite, showText]);

    const sizeClass = useMemo(
      () => (size === "small" ? "small" : size === "large" ? "large" : ""),
      [size]
    );

    const buttonTitle = useMemo(
      () => {
        if (!isAuthenticated) return "Log in to add to favorites";
        if (isFavorite) return "Already in favorites";
        return "Add to favorites";
      },
      [isAuthenticated, isFavorite]
    );

    return (
      <button
        className={`add-to-favorites-btn ${className} ${sizeClass} ${isFavorite ? "is-favorite" : ""}`}
        onClick={handleAddToFavorites}
        disabled={isLoading || isFavorite}
        title={buttonTitle}
      >
        {buttonContent}
      </button>
    );
  }
);

AddToFavoritesButton.displayName = "AddToFavoritesButton";

export default AddToFavoritesButton;

