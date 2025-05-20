import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
  const { user, isLoading, error } = useAuth0();

  if (isLoading) {
    return (
      <div className="profile-container">
        <div className="id-card">
          <div className="loading-message">Loading profile...</div>
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

  if (!user) {
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
              {/* Add team display logic here */}
              <p>No Pokémon in your team yet</p>
            </div>
          </div>
          <div className="favorites-section">
            <h3>Favorites</h3>
            <div className="favorites-placeholder">
              {/* Add favorites display logic here */}
              <p>No favorites yet</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
