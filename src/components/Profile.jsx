import React, { useState } from "react";
import {
  useGetPokemonCollectionQuery,
  useRemovePokemonMutation,
  useGetFavoritesQuery,
  useAddFavoriteMutation,
  useRemoveFavoriteMutation,
} from "../state/PokeCartApi";
import PokeballLoader from "./PokeballLoader";

const Profile = ({ user, isAuthenticated }) => {
  const { data: team } = useGetPokemonCollectionQuery();
  const { data: favorites } = useGetFavoritesQuery();
  const [removePokemon] = useRemovePokemonMutation();
  const [addFavorite] = useAddFavoriteMutation();
  const [removeFavorite] = useRemoveFavoriteMutation();
  const [removingPokemon, setRemovingPokemon] = useState(null);
  const [removingFavorite, setRemovingFavorite] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const handleRemovePokemon = async (pokemonName) => {
    if (
      window.confirm(
        `Are you sure you want to remove ${pokemonName} from your team?`
      )
    ) {
      try {
        setRemovingPokemon(pokemonName);
        await removePokemon(pokemonName).unwrap();
        setSuccessMessage(`${pokemonName} has been removed from your team!`);
        setTimeout(() => setSuccessMessage(""), 3000);
      } catch (error) {
        console.error("Failed to remove Pokémon:", error);
        alert("Failed to remove Pokémon. Please try again.");
      } finally {
        setRemovingPokemon(null);
      }
    }
  };

  const handleAddFavorite = async (pokemon) => {
    try {
      await addFavorite(pokemon).unwrap();
      setSuccessMessage(`${pokemon.name} has been added to your favorites!`);
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error("Failed to add to favorites:", error);
      alert("Failed to add to favorites. Please try again.");
    }
  };

  const handleRemoveFavorite = async (pokemonName) => {
    if (
      window.confirm(
        `Are you sure you want to remove ${pokemonName} from your favorites?`
      )
    ) {
      try {
        setRemovingFavorite(pokemonName);
        await removeFavorite(pokemonName).unwrap();
        setSuccessMessage(
          `${pokemonName} has been removed from your favorites!`
        );
        setTimeout(() => setSuccessMessage(""), 3000);
      } catch (error) {
        console.error("Failed to remove from favorites:", error);
        alert("Failed to remove from favorites. Please try again.");
      } finally {
        setRemovingFavorite(null);
      }
    }
  };

  if (!isAuthenticated || !user) {
    return (
      <div className="profile-container">
        <div className="id-card">
          <div className="error-message">
            Please log in to view your profile
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="id-card">
        {successMessage && (
          <div className="success-message">{successMessage}</div>
        )}
        <div className="id-card-header">
          <h2>Trainer ID Card</h2>
        </div>
        <div className="id-card-content">
          <div className="id-card-photo">
            <img
              src={user.picture}
              alt={user.name}
              className="profile-picture"
            />
          </div>
          <div className="id-card-info">
            <div className="info-row">
              <span className="label">Name:</span>
              <span className="value">{user.name}</span>
            </div>
            <div className="info-row">
              <span className="label">Email:</span>
              <span className="value">{user.email}</span>
            </div>
            <div className="info-row">
              <span className="label">Trainer ID:</span>
              <span className="value">{user.sub?.split("|")[1] || "N/A"}</span>
            </div>
          </div>
        </div>
        <div className="id-card-footer">
          <div className="team-section">
            <h3>Your Team</h3>
            <div className="team-placeholder">
              {team && team.length > 0 ? (
                <div className="team-grid">
                  {team.map((pokemon) => (
                    <div
                      key={pokemon.name}
                      className={`team-pokemon ${
                        removingPokemon === pokemon.name ? "removing" : ""
                      }`}
                    >
                      <img src={pokemon.img} alt={pokemon.name} />
                      <span>{pokemon.name}</span>
                      <div className="pokemon-actions">
                        <button
                          className="remove-pokemon-btn"
                          onClick={() => handleRemovePokemon(pokemon.name)}
                          title={`Remove ${pokemon.name} from team`}
                          aria-label={`Remove ${pokemon.name} from team`}
                          disabled={removingPokemon === pokemon.name}
                        >
                          ×
                        </button>
                        <button
                          className="favorite-btn"
                          onClick={() => handleAddFavorite(pokemon)}
                          title={`Add ${pokemon.name} to favorites`}
                          aria-label={`Add ${pokemon.name} to favorites`}
                          disabled={favorites?.some(
                            (f) => f.name === pokemon.name
                          )}
                        >
                          ★
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No Pokémon in your team yet</p>
              )}
            </div>
          </div>
          <div className="favorites-section">
            <h3>Favorites</h3>
            <div className="favorites-placeholder">
              {favorites && favorites.length > 0 ? (
                <div className="favorites-grid">
                  {favorites.map((pokemon) => (
                    <div
                      key={pokemon.name}
                      className={`favorite-pokemon ${
                        removingFavorite === pokemon.name ? "removing" : ""
                      }`}
                    >
                      <img src={pokemon.img} alt={pokemon.name} />
                      <span>{pokemon.name}</span>
                      <button
                        className="remove-favorite-btn"
                        onClick={() => handleRemoveFavorite(pokemon.name)}
                        title={`Remove ${pokemon.name} from favorites`}
                        aria-label={`Remove ${pokemon.name} from favorites`}
                        disabled={removingFavorite === pokemon.name}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No favorites yet</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
