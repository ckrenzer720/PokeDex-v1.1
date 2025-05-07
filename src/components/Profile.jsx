import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
  const { user } = useAuth0();

  return (
    <div style={{ padding: "20px" }}>
      <h2>{user.name}'s Profile</h2>
      <img
        src={user.picture}
        alt={user.name}
        style={{ width: "100px", borderRadius: "50%", marginBottom: "20px" }}
      />
      <p>Email: {user.email}</p>
      <h3>Your Team</h3>
      {/* Add logic to display and manage the user's team */}
      <h3>Your Favorites</h3>
      {/* Add logic to display and manage the user's favorites */}
    </div>
  );
};

export default Profile;
