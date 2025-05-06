import React, { useState } from "react";

const PokemonSearchBar = ({ onSearch }) => {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");

  const handleSearch = () => {
    onSearch({ search, type });
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <input
        type="text"
        placeholder="Search by name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginRight: "10px" }}
      />
      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        style={{ marginRight: "10px" }}
      >
        <option value="">All Types</option>
        <option value="Normal">Normal</option>
        <option value="Fire">Fire</option>
        <option value="Fighting">Fighting</option>
        <option value="Water">Water</option>
        <option value="Flying">Flying</option>
        <option value="Grass">Grass</option>
        <option value="Poison">Poison</option>
        <option value="Electric">Electric</option>
        <option value="Ground">Ground</option>
        <option value="Psychic">Psychic</option>
        <option value="Rock">Rock</option>
        <option value="Ice">Ice</option>
        <option value="Bug">Bug</option>
        <option value="Dragon">Dragon</option>
        <option value="Ghost">Ghost</option>
        <option value="Dark">Dark</option>
        <option value="Steel">Steel</option>
        <option value="Fairy">Fairy</option>
        <option value="Stellar">Stellar</option>
      </select>
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default PokemonSearchBar;
