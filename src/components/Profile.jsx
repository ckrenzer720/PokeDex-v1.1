import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {
  useGetPokemonCollectionQuery,
  useRemovePokemonMutation,
} from "../state/PokeCartApi";
import PokeballLoader from "./PokeballLoader";

const Profile = () => {
  const { user, isLoading, error, isAuthenticated } = useAuth0();
  const { data: team } = useGetPokemonCollectionQuery();
  const [removePokemon] = useRemovePokemonMutation();
  const [removingPokemon, setRemovingPokemon] = useState(null);
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
        setTimeout(() => setSuccessMessage(""), 3000); // Clear message after 3 seconds
      } catch (error) {
        console.error("Failed to remove Pokémon:", error);
        alert("Failed to remove Pokémon. Please try again.");
      } finally {
        setRemovingPokemon(null);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="profile-container">
        <div className="id-card">
          <div className="loading-message">
            <PokeballLoader />
            <p>Loading profile...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="profile-container">
        <div className="id-card">
          <div className="error-message">
            Error loading profile: {error.message}
          </div>
        </div>
      </div>
    );
  }

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
                      <button
                        className="remove-pokemon-btn"
                        onClick={() => handleRemovePokemon(pokemon.name)}
                        title={`Remove ${pokemon.name} from team`}
                        aria-label={`Remove ${pokemon.name} from team`}
                        disabled={removingPokemon === pokemon.name}
                      >
                        ×
                      </button>
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
              <p>No favorites yet</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
